/**
 * ===========================================================
 * File: EmailService.java
 * Location: com.visiomatix.chat.chat.chat.service
 * Author: Viral Prajapati
 * Date: 11-Dec-2025
 * Description:
 *  Service for sending emails, specifically chat transcripts
 *  when chat sessions end.
 * ===========================================================
 */

package com.visiomatix.chat.chat.chat.service;

import com.visiomatix.chat.chat.chat.model.ChatSession;
import com.visiomatix.chat.chat.chat.model.Message;
import com.visiomatix.chat.chat.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.format.DateTimeFormatter;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Send chat transcript to user when session ends
     */
    public void sendChatTranscript(ChatSession session, List<Message> messages, User user) {
        logger.info("Attempting to send chat transcript email to user: {} ({}) for session: {}",
                   user.getUsername(), user.getEmail(), session.getSessionName());

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(user.getEmail());
            helper.setSubject("Chat Transcript - Session: " + session.getSessionName());
            helper.setFrom("viral.prajapati.nmims@gmail.com");

            String htmlContent = buildTranscriptHtml(session, messages, user);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            logger.info("Successfully sent chat transcript email to: {} for session: {}", user.getEmail(), session.getSessionName());
        } catch (MessagingException e) {
            // Log error but don't throw exception to avoid breaking chat flow
            logger.error("Failed to send chat transcript email to user: {} ({}) for session: {}. Error: {}",
                        user.getUsername(), user.getEmail(), session.getSessionName(), e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error sending chat transcript email to user: {} ({}) for session: {}. Error: {}",
                        user.getUsername(), user.getEmail(), session.getSessionName(), e.getMessage(), e);
        }
    }

    private String buildTranscriptHtml(ChatSession session, List<Message> messages, User user) {
        StringBuilder html = new StringBuilder();

        html.append("<html><head>")
            .append("<style>")
            .append("body { font-family: Arial, sans-serif; margin: 20px; }")
            .append(".header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }")
            .append(".message { margin-bottom: 15px; padding: 10px; border-radius: 5px; }")
            .append(".user-message { background-color: #e3f2fd; margin-left: 20%; }")
            .append(".agent-message { background-color: #f3e5f5; margin-right: 20%; }")
            .append(".system-message { background-color: #fff3e0; text-align: center; font-style: italic; }")
            .append(".timestamp { font-size: 12px; color: #666; margin-bottom: 5px; }")
            .append(".sender { font-weight: bold; }")
            .append("</style>")
            .append("</head><body>");

        // Header
        html.append("<div class='header'>")
            .append("<h2>Chat Transcript</h2>")
            .append("<p><strong>Session:</strong> ").append(session.getSessionName()).append("</p>")
            .append("<p><strong>Date:</strong> ").append(session.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))).append("</p>")
            .append("<p><strong>User:</strong> ").append(user.getName()).append(" (").append(user.getUsername()).append(")</p>")
            .append("</div>");

        // Messages
        html.append("<h3>Conversation</h3>");
        for (Message msg : messages) {
            String messageClass = "system-message";
            if (msg.getSender() != null) {
                if (msg.getSender().getId().equals(user.getId())) {
                    messageClass = "user-message";
                } else {
                    messageClass = "agent-message";
                }
            }

            html.append("<div class='message ").append(messageClass).append("'>")
                .append("<div class='timestamp'>")
                .append(msg.getSentAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .append("</div>");

            if (msg.getSender() != null) {
                html.append("<div class='sender'>").append(msg.getSender().getName()).append(":</div>");
            } else {
                html.append("<div class='sender'>System:</div>");
            }

            html.append("<div>").append(escapeHtml(msg.getContent())).append("</div>")
                .append("</div>");
        }

        html.append("<div style='margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;'>")
            .append("<p><strong>Thank you for using Visiomatix Chat!</strong></p>")
            .append("<p>This transcript has been saved for your records. If you need further assistance, feel free to start a new chat session.</p>")
            .append("<p>Best regards,<br>Visiomatix Team</p>")
            .append("</div>");

        html.append("</body></html>");

        return html.toString();
    }

    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("&", "&")
                  .replace("<", "<")
                  .replace(">", ">")
                  .replace("\"", "&quot;")
                  .replace("'", "'")
                  .replace("\n", "<br>");
    }
}