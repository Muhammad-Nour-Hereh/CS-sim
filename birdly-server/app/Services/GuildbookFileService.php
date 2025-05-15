<?php

namespace App\Services;

use App\Models\Course;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GuildbookFileService {
    public function buildPath(string $courseTitle, string $pageTitle) {
        $courseSlug = Str::slug($courseTitle);
        $pageSlug = Str::slug($pageTitle);
        return "$courseSlug/guildbooks/$pageSlug.mdx";
    }

    public function store(int $courseId, string $pageTitle, string $content) {
        $course = Course::find($courseId);
        if (!$course) {
            return null;
        }

        $path = $this->buildPath($course->title, $pageTitle);
        Storage::disk('public')->put($path, $content);
        return $path;
    }

    public function read(string $path) {
        return Storage::disk('public')->get($path);
    }

    public function update(string $path, string $content) {
        Storage::disk('public')->put($path, $content);
    }

    public function delete(string $path) {
        Storage::disk('public')->delete($path);
    }
}
