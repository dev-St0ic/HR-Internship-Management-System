<?php

namespace App\Mail;

use App\Models\Application;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ApplicationApprovedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $application;
    public $password;

    /**
     * Create a new message instance.
     */
    public function __construct(Application $application, $password)
    {
        $this->application = $application;
        $this->password = $password;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Congratulations! Your Internship Application is Approved',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.application_approved', // We will create this view next
        );
    }
}