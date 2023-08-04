<?php

namespace App\Observers;

use App\Models\Barang;
use App\Models\BarangMasuk;
use Illuminate\Support\Facades\DB;

class BarangMasukObserver
{
    /**
     * Handle the BarangMasuk "created" event.
     */
    public function created(BarangMasuk $barangMasuk): void
    {
        DB::transaction(function () use ($barangMasuk) {
            $barang = Barang::find($barangMasuk->barang_id);
            $barang->stok += $barangMasuk->qty_masuk;
            $barang->save();
        });
    }

    /**
     * Handle the BarangMasuk "updated" event.
     */
    public function updated(BarangMasuk $barangMasuk): void
    {
        DB::transaction(function () use ($barangMasuk) {
            $newMasuk = $barangMasuk->qty_masuk - $barangMasuk->getOriginal('qty_masuk');
            $barang = Barang::find($barangMasuk->barang_id);
            $barang->stok += $newMasuk;
            $barang->save();
        });
    }

    /**
     * Handle the BarangMasuk "deleted" event.
     */
    public function deleted(BarangMasuk $barangMasuk): void
    {
        DB::transaction(function () use ($barangMasuk) {
            $barang = Barang::find($barangMasuk->barang_id);
            $barang->stok -= $barangMasuk->qty_masuk;
            $barang->save();
        });
    }

    /**
     * Handle the BarangMasuk "restored" event.
     */
    public function restored(BarangMasuk $barangMasuk): void
    {
        //
    }

    /**
     * Handle the BarangMasuk "force deleted" event.
     */
    public function forceDeleted(BarangMasuk $barangMasuk): void
    {
        //
    }
}
