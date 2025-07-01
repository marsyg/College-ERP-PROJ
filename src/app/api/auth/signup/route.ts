import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const {
      username,
      email,
      password,
      role,
      studentId,
      facultyId,
      adminId,
      avatar
    } = await request.json();

    // Basic validation
    if (!username || !email || !password || !role) {
      return NextResponse.json(
        { error: 'All required fields are mandatory' },
        { status: 400 }
      );
    }

    // Check if email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already registered' },
        { status: 400 }
      );
    }

    // Validate role and corresponding ID
    let userIdField: string | null = null;
    switch (role) {
      case 'student':
        if (!studentId) {
          return NextResponse.json(
            { error: 'Student ID is required for student registration' },
            { status: 400 }
          );
        }
        userIdField = studentId;
        break;
      case 'faculty':
        if (!facultyId) {
          return NextResponse.json(
            { error: 'Faculty ID is required for faculty registration' },
            { status: 400 }
          );
        }
        userIdField = facultyId;
        break;
      case 'admin':
        if (!adminId) {
          return NextResponse.json(
            { error: 'Admin ID is required for admin registration' },
            { status: 400 }
          );
        }
        userIdField = adminId;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid role' },
          { status: 400 }
        );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordhash: password, // In production, hash this password!
        role,
        avatar,
        status: true,
        createdat: new Date(),
        updatedat: new Date(),
        studentid: role === 'student' ? userIdField : null,
        facultyid: role === 'faculty' ? userIdField : null,
        adminid: role === 'admin' ? userIdField : null,
      },
    });

    return NextResponse.json({
      message: 'Registration successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
