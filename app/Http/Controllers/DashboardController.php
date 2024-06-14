<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Barang;
use App\Models\Kategori;
use App\Models\BarangMasuk;
use App\Models\BarangKeluar;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $barangCount = Barang::count();
        $kategoriCount = Kategori::count();
        $barangMasukCount = BarangMasuk::count();
        $barangKeluarCount = BarangKeluar::count();

        return Inertia::render('Dashboard', [
            'barangCount' => $barangCount,
            'kategoriCount' => $kategoriCount,
            'barangMasukCount' => $barangMasukCount,
            'barangKeluarCount' => $barangKeluarCount,
        ]);
    }
}
