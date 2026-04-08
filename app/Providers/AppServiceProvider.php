<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // هنا ممكن تسجل أي خدمة تحتاجها في المشروع
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // تحديد طول الحروف الافتراضي للحماية من مشاكل UTF8 و MySQL القديمة
        Schema::defaultStringLength(191);
    }
}
