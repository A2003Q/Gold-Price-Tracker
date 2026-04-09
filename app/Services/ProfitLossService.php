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

    // 🔹 الوزن
    if ($asset->type === 'coin') {
        $weight = match (strtolower($asset->category)) {
            'rashadi' => 7.2,
            'english' => 8,
            default => 0,
        };
    } else {
        $weight = (float) $asset->weight;
    }

    // 🔹 التحويل
    $usdToJod = 0.71;
    $jodToUsd = 1 / $usdToJod;

    // 🔥 أهم تعديل: تحويل سعر الشراء
    if ($asset->currency === 'JOD') {
        $purchasePriceUsd = $asset->purchase_price * $jodToUsd;
    } else {
        $purchasePriceUsd = $asset->purchase_price;
    }

    // 🔹 القيمة الحالية بالدولار
    $currentValueUsd = $pricePerGram * $weight;

    // 🔹 الربح والخسارة (صح 100%)
    $profitLossUsd = $currentValueUsd - $purchasePriceUsd;

    // 🔹 النسبة
    $percentage = 0;
    if ($purchasePriceUsd > 0) {
        $percentage = ($profitLossUsd / $purchasePriceUsd) * 100;
    }

    return [
        'used_weight_grams' => round($weight, 2),

        'price_per_gram_usd' => round($pricePerGram, 2),
        'price_per_gram_jod' => round($pricePerGram * $usdToJod, 2),

        'purchase_price_usd' => round($purchasePriceUsd, 2),
        'purchase_price_jod' => round($purchasePriceUsd * $usdToJod, 2),

        'current_value_usd' => round($currentValueUsd, 2),
        'current_value_jod' => round($currentValueUsd * $usdToJod, 2),

        'profit_loss_usd' => round($profitLossUsd, 2),
        'profit_loss_jod' => round($profitLossUsd * $usdToJod, 2),

        'profit_loss_percentage' => round($percentage, 2),
    ];
}
}
