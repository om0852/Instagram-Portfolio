import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { from, subject, message, name } = await req.json();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Authenticated sender
            to: process.env.EMAIL_USER,   // Send TO yourself (the portfolio owner)
            replyTo: from,                // Reply to the visitor
            subject: `Portfolio Contact: ${subject} (from ${name})`,
            text: `
        Name: ${name}
        Email: ${from}
        
        Message:
        ${message}
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error("Email send error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
