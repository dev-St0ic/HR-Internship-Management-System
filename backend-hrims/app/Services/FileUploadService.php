<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use InvalidArgumentException;

class FileUploadService
{
    /**
     * validateFile() — check file type (PDF, DOC, XLSX, JPG, PNG), max 10MB
     */
    public function validateFile(UploadedFile $file): bool
    {
        $allowedExtensions = ['pdf', 'doc', 'docx', 'xlsx', 'jpg', 'jpeg', 'png'];
        $maxSizeKB = 10240; // 10MB

        $extension = strtolower($file->getClientOriginalExtension());
        
        if (!in_array($extension, $allowedExtensions)) {
            throw new InvalidArgumentException("Invalid file type. Allowed types: PDF, DOC, DOCX, XLSX, JPG, PNG.");
        }

        if ($file->getSize() > ($maxSizeKB * 1024)) {
            throw new InvalidArgumentException("File size exceeds the 10MB limit.");
        }

        return true;
    }

    /**
     * upload() — store file in documents/{type}/{year}/{month}/
     */
    public function upload(UploadedFile $file, string $documentType): string
    {
        $this->validateFile($file);

        $year = date('Y');
        $month = date('m');
        $folderPath = "documents/{$documentType}/{$year}/{$month}";

        // Uses the default disk set in config/filesystems.php (local for dev, s3 for prod)
        $disk = config('filesystems.default', 'local');
        
        return $file->store($folderPath, $disk);
    }

    /**
     * deleteFile() — remove document from storage
     */
    public function deleteFile(string $filePath): bool
    {
        $disk = config('filesystems.default', 'local');

        if (Storage::disk($disk)->exists($filePath)) {
            return Storage::disk($disk)->delete($filePath);
        }

        return false;
    }

    /**
     * generateSecureUrl() — signed URL with expiry for file downloads
     */
    public function generateSecureUrl(string $filePath, int $minutes = 60): string
    {
        $diskName = config('filesystems.default', 'local');

        if ($diskName === 's3') {
            /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
            $disk = Storage::disk($diskName);
            
            return $disk->temporaryUrl($filePath, now()->addMinutes($minutes));
        }

        // Fallback for local development
        return asset(Storage::url($filePath));
    }
}