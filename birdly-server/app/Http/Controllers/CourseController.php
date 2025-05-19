<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Models\Course;
use App\Repositories\CourseRepo;

class CourseController extends Controller {

    public function __construct(protected CourseRepo $course) {
    }

    public function index() {
        return $this->successResponse(Course::all());
    }

    public function store(CourseRequest $request) {
        $id = $this->course->create($request->input('title'));
        return $this->createdResponse($id);
    }

    public function show($id) {
        $course = Course::find($id);

        if (!$course)
            return $this->notFoundResponse();

        return $this->successResponse($course);
    }

    public function update(CourseRequest $request, $id) {
        $course = Course::find($id);

        if (!$course)
            return $this->notFoundResponse();

        $course->update([
            'title' => $request->input('title'),
        ]);

        return $this->successResponse($course);
    }

    public function destroy($id) {
        $course = Course::find($id);

        if (!$course)
            return $this->notFoundResponse();

        $course->delete();

        return $this->noContentResponse();
    }
}
