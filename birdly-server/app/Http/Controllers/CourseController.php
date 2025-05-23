<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Models\Course;
use App\Repositories\CourseRepo;

class CourseController extends Controller {

    public function __construct(protected CourseRepo $course) {
    }

    public function index() {
        return $this->successResponse($this->course->all());
    }

    public function store(CourseRequest $request) {
        $id = $this->course->create($request->input('title'));
        return $this->createdResponse($id);
    }

    public function show($id) {
        $course = $this->course->find($id);
        if (!$course)
            return $this->notFoundResponse();

        return $this->successResponse($course);
    }

    public function update(CourseRequest $request, $id) {
        $course = $this->course->update($id, $request->input('title'));
        if (!$course)
            return $this->notFoundResponse();

        return $this->successResponse($course);
    }


    public function destroy($id) {
        $deleted = $this->course->delete($id);
        if (!$deleted)
            return $this->notFoundResponse();

        return $this->noContentResponse();
    }
}
