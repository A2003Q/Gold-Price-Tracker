<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\GoldPriceService;
use App\Services\ProfitLossService;

class AssetController extends Controller
{
    protected $goldPriceService;
    protected $profitLossService;

    public function __construct(GoldPriceService $goldPriceService, ProfitLossService $profitLossService)
    {
        $this->goldPriceService = $goldPriceService;
        $this->profitLossService = $profitLossService;
    }

    public function index(Request $request)
    {
        $assets = $request->user()->assets;
        $goldResult = $this->goldPriceService->getLiveGoldPrices();

        if (!$goldResult['success']) {
            return response()->json([
                'message' => 'Failed to fetch live gold prices'
            ], 500);
        }

        $goldPrices = $goldResult['data'];

        $assetsWithValues = $assets->map(function ($asset) use ($goldPrices) {
            $calculation = $this->profitLossService->calculateAssetValue($goldPrices, $asset);

            return [
                'id' => $asset->id,
                'type' => $asset->type,
                'karat' => $asset->karat,
                'category' => $asset->category,
                'weight' => $asset->weight,
                'purchase_price' => $asset->purchase_price,
                'purchase_date' => $asset->purchase_date,
                'image' => $asset->image,
                'currency' => $asset->currency,
                'calculation' => $calculation,
            ];
        });

        return response()->json([
            'assets' => $assetsWithValues
        ]);
    }

    public function store(Request $request)
    {
    $validator = Validator::make($request->all(), [
    'type' => 'required|in:jewelry,bar,coin',
    'karat' => 'nullable|string',
    'category' => 'nullable|string',
    'weight' => 'nullable|numeric',
    'purchase_price' => 'required|numeric',
    'purchase_date' => 'nullable|date',
    'image' => 'nullable',
    'currency' => 'nullable|string',
]);

if ($validator->fails()) {
    return response()->json([
        'message' => 'Validation errors',
        'errors' => $validator->errors(),
    ], 422);
}

if (in_array($request->type, ['jewelry', 'bar']) && !$request->filled('weight')) {
    return response()->json([
        'message' => 'Validation errors',
        'errors' => [
            'weight' => ['Weight is required for jewelry and bar assets.']
        ]
    ], 422);
}

    $imagePath = null;

if ($request->hasFile('image')) {
    $imagePath = $request->file('image')->store('assets', 'public');
}
    $asset = Asset::create([
    'user_id' => $request->user()->id,
    'type' => $request->type,
    'karat' => $request->karat,
    'category' => $request->category,
    'weight' => $request->weight ?? null,
    'purchase_price' => $request->purchase_price,
    'purchase_date' => $request->purchase_date,
    'image' => $imagePath,
    'currency' => $request->currency ?? 'JOD',
]);

        return response()->json([
            'message' => 'Asset created successfully',
            'asset' => $asset
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $asset = Asset::findOrFail($id);

        if ($asset->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $goldResult = $this->goldPriceService->getLiveGoldPrices();

        if (!$goldResult['success']) {
            return response()->json([
                'message' => 'Failed to fetch live gold prices'
            ], 500);
        }

        $calculation = $this->profitLossService->calculateAssetValue($goldResult['data'], $asset);

        return response()->json([
            'asset' => $asset,
            'calculation' => $calculation
        ]);
    }

    public function update(Request $request, $id)
{
    $asset = Asset::findOrFail($id);

    if ($asset->user_id !== $request->user()->id) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $validator = Validator::make($request->all(), [
        'type' => 'sometimes|in:jewelry,bar,coin',
        'karat' => 'nullable|string',
        'category' => 'nullable|string',
        'weight' => 'nullable|numeric',
        'purchase_price' => 'sometimes|numeric',
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

    $type = $request->type ?? $asset->type;

    if (in_array($type, ['jewelry', 'bar']) && $request->has('type') && !$request->filled('weight') && !$asset->weight) {
        return response()->json([
            'message' => 'Validation errors',
            'errors' => [
                'weight' => ['Weight is required for jewelry and bar assets.']
            ]
        ], 422);
    }

    $asset->update([
        'type' => $type,
        'karat' => $request->karat ?? $asset->karat,
        'category' => $request->category ?? $asset->category,
        'weight' => $request->weight ?? $asset->weight,
        'purchase_price' => $request->purchase_price ?? $asset->purchase_price,
        'purchase_date' => $request->purchase_date ?? $asset->purchase_date,
        'image' => $request->image ?? $asset->image,
        'currency' => $request->currency ?? $asset->currency,
    ]);

    return response()->json([
        'message' => 'Asset updated successfully',
        'asset' => $asset
    ]);
}

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

