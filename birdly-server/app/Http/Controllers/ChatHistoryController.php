<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorechatHistoryRequest;
use App\Http\Requests\UpdatechatHistoryRequest;
use App\Models\chatHistory;

class ChatHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorechatHistoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(chatHistory $chatHistory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(chatHistory $chatHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatechatHistoryRequest $request, chatHistory $chatHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(chatHistory $chatHistory)
    {
        //
    }
}
