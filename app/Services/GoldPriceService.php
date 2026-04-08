<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GoldPriceService
{
  public function getLiveGoldPrices()
{
    $response = Http::get(env('GOLD_API_URL'));

    if (!$response->successful()) {
        return [
            'success' => false,
            'message' => 'Failed to fetch gold price',
            'error' => $response->body(),
        ];
    }

    $data = $response->json();

    if (!isset($data['price'])) {
        return [
            'success' => false,
            'message' => 'Price not found in API response',
            'response' => $data,
        ];
    }

    // Ounce price (USD)
    $ouncePrice = (float) $data['price'];

    // USD → JOD rate
    $usdToJod = 0.71;

    // Gram
    $gramPrice = $ouncePrice / 31.1035;

    // Karats (USD)
    $price24K = $gramPrice;
    $price21K = $gramPrice * 21 / 24;
    $price18K = $gramPrice * 18 / 24;

    return [
        'success' => true,
        'data' => [

            // Ounce
            'ounce_price_usd' => round($ouncePrice, 2),
            'ounce_price_jod' => round($ouncePrice * $usdToJod, 2),

            // Gram
            'gram_price_usd' => round($gramPrice, 2),
            'gram_price_jod' => round($gramPrice * $usdToJod, 2),

            // 24K
            '24k_price_usd' => round($price24K, 2),
            '24k_price_jod' => round($price24K * $usdToJod, 2),

            // 21K
            '21k_price_usd' => round($price21K, 2),
            '21k_price_jod' => round($price21K * $usdToJod, 2),

            // 18K
            '18k_price_usd' => round($price18K, 2),
            '18k_price_jod' => round($price18K * $usdToJod, 2),
        ]
    ];
}
}
