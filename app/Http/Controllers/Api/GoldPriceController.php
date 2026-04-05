<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\GoldPriceService;

class GoldPriceController extends Controller
{
    protected $goldPriceService;

    public function __construct(GoldPriceService $goldPriceService)
    {
        $this->goldPriceService = $goldPriceService;
    }

    public function livePrices()
    {
        $result = $this->goldPriceService->getLiveGoldPrices();

        if (!$result['success']) {
            return response()->json($result, 500);
        }

        return response()->json($result);
    }
}
