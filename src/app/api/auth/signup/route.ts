import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// import { hash } from 'bcryptjs'; // Optional

export async function POST(request: Request) {
  try {
    const {
      username,
      email,
      password,
      role,
      studentid,
      facultyid,
      adminid,
      avatar,
      name
    } = await request.json();

    // Basic validation
    if (!username || !email || !password || !role ) {
      return NextResponse.json(
        { error: 'All required fields are mandatory' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already registered' },
        { status: 400 }
      );
    }

    let useridField: string;
    const now = new Date();
    // const hashedPassword = await hash(password, 10);
    const hashedPassword = password;

    const user = await prisma.$transaction(async (tx: typeof prisma) => {
      let relatedid: string;

      if (role === 'student') {
        if (!studentid) {
          throw new Error("Student ID required");
        }
        relatedid = studentid;

        const exists = await tx.students.findUnique({
          where: { student_id: studentid }
        });

        if (!exists) {
          await tx.students.create({
            data: {
              student_id: studentid,
              name: username,
              email,
              date_of_birth: new Date('2000-01-01'), // Replace
              admission_date: now,
              course_id: "", // Replace
            }
          });
        }

        return await tx.user.create({
          data: {
            username,
            email,
            passwordhash: hashedPassword,
            role,
            avatar,
            status: true,
            createdat: now,
            updatedat: now,
            studentid: relatedid,
          },
        });
      }

      if (role === 'faculty') {
        if (!facultyid) {
          throw new Error("Faculty ID required");
        }
        relatedid = facultyid;

        const exists = await tx.faculty.findUnique({
          where: { faculty_id: facultyid }
        });

        if (!exists) {
          await tx.faculty.create({
            data: {
              faculty_id: facultyid,
              name: username,
              email,
              department: "", // Replace
              doj: now,
            }
          });
        }

        return await tx.user.create({
          data: {
            username,
            email,
            passwordhash: hashedPassword,
            role,
            avatar,
            status: true,
            createdat: now,
            updatedat: now,
            facultyid: relatedid,
          },
        });
      }

      if (role === 'admin') {
        if (!adminid) {
          throw new Error("Admin ID required");
        }
        relatedid = adminid;

        const exists = await tx.admins.findUnique({
          where: { admin_id: adminid }
        });

        if (!exists) {
          await tx.admins.create({
            data: {
              admin_id: adminid,
              name: username,
              email,
              doj: now,
            }
          });
        }

        return await tx.user.create({
          data: {
            username,
            email,
            passwordhash: hashedPassword,
            role,
            avatar,
            status: true,
            createdat: now,
            updatedat: now,
            adminid: relatedid,
          },
        });
      }

      throw new Error('Invalid role');
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

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
