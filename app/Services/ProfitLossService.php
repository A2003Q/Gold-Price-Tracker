<?php

namespace App\Services;

class ProfitLossService
{
public function calculateAssetValue(array $goldPrices, $asset)
{
    $karat = (string) $asset->karat;

    $pricePerGram = match ($karat) {
        '24' => $goldPrices['24k_price_usd'],
        '21' => $goldPrices['21k_price_usd'],
        '18' => $goldPrices['18k_price_usd'],
        default => $goldPrices['24k_price_usd'],
    };

    if ($asset->type === 'coin') {
        $weight = match (strtolower($asset->category)) {
            'rashadi' => 7.2,
            'english' => 8,
            default => 0,
        };
    } else {
        $weight = (float) $asset->weight;
    }

    $currentValue = $pricePerGram * $weight;
    $profitLoss = $currentValue - $asset->purchase_price;

    $percentage = 0;
    if ((float) $asset->purchase_price > 0) {
        $percentage = ($profitLoss / $asset->purchase_price) * 100;
    }

    $usdToJod = 0.71;

    return [
        'used_weight_grams' => round($weight, 2),
        'price_per_gram_usd' => round($pricePerGram, 2),
        'price_per_gram_jod' => round($pricePerGram * $usdToJod, 2),
        'current_value_usd' => round($currentValue, 2),
        'current_value_jod' => round($currentValue * $usdToJod, 2),
        'profit_loss_usd' => round($profitLoss, 2),
        'profit_loss_jod' => round($profitLoss * $usdToJod, 2),
        'profit_loss_percentage' => round($percentage, 2),
    ];
}
}
