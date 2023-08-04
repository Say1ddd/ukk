<?php

namespace App\Observers;

use App\Models\Barang;
use App\Models\BarangKeluar;
use Illuminate\Support\Facades\DB;

class BarangKeluarObserver
{
    /**
     * Handle the BarangKeluar "created" event.
     */
    public function created(BarangKeluar $barangKeluar): void
    {
        DB::transaction(function () use ($barangKeluar) {
            $barang = Barang::find($barangKeluar->barang_id);
            $barang->stok -= $barangKeluar->qty_keluar;
            $barang->save();
        });
    }

    /**
     * Handle the BarangKeluar "updated" event.
     */
    public function updated(BarangKeluar $barangKeluar): void
    {
        DB::transaction(function () use ($barangKeluar) {
            $newKeluar = $barangKeluar->qty_keluar - $barangKeluar->getOriginal('qty_keluar');
            $barang = Barang::find($barangKeluar->barang_id);
            $barang->stok -= $newKeluar;
            $barang->save();
        });
    }

    /**
     * Handle the BarangKeluar "deleted" event.
     */
    public function deleted(BarangKeluar $barangKeluar): void
    {
        DB::transaction(function () use ($barangKeluar) {
            $barang = Barang::find($barangKeluar->barang_id);
            $barang->stok += $barangKeluar->qty_keluar;
            $barang->save();
        });
    }

    /**
     * Handle the BarangKeluar "restored" event.
     */
    public function restored(BarangKeluar $barangKeluar): void
    {
        //
    }

    /**
     * Handle the BarangKeluar "force deleted" event.
     */
    public function forceDeleted(BarangKeluar $barangKeluar): void
    {
        //
    }
}
