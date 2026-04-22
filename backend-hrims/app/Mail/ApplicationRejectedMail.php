<?php

namespace App\Mail;

use App\Models\Application;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ApplicationRejectedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $application;
    public $reason;

    public function __construct(Application $application, $reason)
    {
        $this->application = $application;
        $this->reason = $reason;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Update regarding your Internship Application',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.application_rejected',
        );
    }
}