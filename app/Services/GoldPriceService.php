<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GoldPriceService
{
    public function getLiveGoldPrices()
    {
        // Call external API
        $response = Http::get(env('GOLD_API_URL'));

        if (!$response->successful()) {
            return [
                'success' => false,
                'message' => 'Failed to fetch gold price',
                'error' => $response->body(),
            ];
        }

        $data = $response->json();

        // Make sure price exists
        if (!isset($data['price'])) {
            return [
                'success' => false,
                'message' => 'Price not found in API response',
                'response' => $data,
            ];
        }

        // Get ounce price
        $ouncePrice = (float) $data['price'];

        // Convert to gram
        $gramPrice = $ouncePrice / 31.1035;

        // Calculate karats
        $price24K = $gramPrice;
        $price21K = $gramPrice * 21 / 24;
        $price18K = $gramPrice * 18 / 24;

        return [
            'success' => true,
            'data' => [
                'ounce_price_usd' => round($ouncePrice, 2),
                'gram_price_usd' => round($gramPrice, 2),
                '24k_price_usd' => round($price24K, 2),
                '21k_price_usd' => round($price21K, 2),
                '18k_price_usd' => round($price18K, 2),
            ]
        ];
    }
}
