<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AssetController extends Controller
{
    // GET all assets for logged-in user
    public function index(Request $request)
    {
        $assets = $request->user()->assets;

        return response()->json([
            'assets' => $assets
        ]);
    }

    // STORE new asset
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:jewelry,bar,coin',
            'karat' => 'nullable|string',
            'category' => 'nullable|string',
            'weight' => 'required|numeric',
            'purchase_price' => 'required|numeric',
            'purchase_date' => 'nullable|date',
            'image' => 'nullable|string',
            'currency' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        $asset = Asset::create([
            'user_id' => $request->user()->id,
            'type' => $request->type,
            'karat' => $request->karat,
            'category' => $request->category,
            'weight' => $request->weight,
            'purchase_price' => $request->purchase_price,
            'purchase_date' => $request->purchase_date,
            'image' => $request->image,
            'currency' => $request->currency ?? 'JOD',
        ]);

        return response()->json([
            'message' => 'Asset created successfully',
            'asset' => $asset
        ], 201);
    }

        // GET single asset
public function show($id)
{
    $asset = Asset::findOrFail($id);

    return response()->json([
        'asset' => $asset
    ]);
}

// UPDATE asset
public function update(Request $request, $id)
{
    $asset = Asset::findOrFail($id);

    // Optional: make sure user owns this asset
    if ($asset->user_id !== $request->user()->id) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $asset->update($request->all());

    return response()->json([
        'message' => 'Asset updated successfully',
        'asset' => $asset
    ]);
}

// DELETE asset
public function destroy(Request $request, $id)
{
    $asset = Asset::findOrFail($id);

    if ($asset->user_id !== $request->user()->id) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $asset->delete();

    return response()->json([
        'message' => 'Asset deleted successfully'
    ]);
}

    }

