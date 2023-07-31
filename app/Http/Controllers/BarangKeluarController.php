<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Barang;
use App\Models\BarangMasuk;
use App\Models\BarangKeluar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class BarangKeluarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $barangkeluars = BarangKeluar::with('barang')->latest()->get();

        return Inertia::render('BarangKeluar/Index', [
            'barangkeluars' => $barangkeluars,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $barangs = DB::table('barang')->get();

        return Inertia::render('BarangKeluar/Create', [
            'barangs' => $barangs
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $tanggalMasuk = BarangMasuk::where('barang_id', $request->barang_id)->latest()->first();
            $remainingStok = Barang::find($request->barang_id)->stok;
    
            $request->validate([
                'tgl_keluar' => ['required', 'date', $tanggalMasuk ? 'after:' . $tanggalMasuk->tanggal_masuk : ''],
                'qty_keluar' => ['required', 'numeric', 'min:1', 'max:' . $remainingStok],
                'barang_id' => ['required', 'exists:barang,id'],
            ], [
                'required' => ':attribute harus diisi',
                'min' => ':attribute minimal :min',
                'qty_keluar.max' => ':attribute tidak boleh melebihi stok barang. sisa stok:' . $remainingStok,
                'after' => ':attribute harus setelah' . ($tanggalMasuk ? $tanggalMasuk->tanggal_masuk : 'tanggal masuk terbaru')
            ]);

            BarangKeluar::create([
                'tgl_keluar' => $request->tgl_keluar,
                'qty_keluar' => $request->qty_keluar,
                'barang_id' => $request->barang_id,
            ]);

            DB::commit();

            return Redirect::route('barangkeluar.index')->with('success', 'Barang keluar berhasil ditambahkan');
        } catch (\Exception $e) {
            report($e);
            DB::rollBack();
            return Redirect::back()->with('error', 'Barang keluar gagal ditambahkan!'. $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id): Response
    {
        $barangKeluar = BarangKeluar::with('barang')->findOrFail($id);
    
        return Inertia::render('BarangKeluar/Show', [
            'barangkeluar' => $barangKeluar,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id): Response
    {
        $barangs = DB::table('barang')->get();
        $barangKeluar = DB::table('barang_keluar')->find($id);
        $barangMasuk = BarangMasuk::where('barang_id', $barangKeluar->barang_id)->latest()->first();

        return Inertia::render('BarangKeluar/Edit', [
            'barangkeluar' => $barangKeluar,
            'barangs' => $barangs,
            'barangMasuk' => $barangMasuk
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $currentStok = Barang::findOrFail($request->barang_id)->stok + BarangKeluar::findOrFail($id)->qty_keluar;
            $tanggalMasuk = BarangMasuk::where('barang_id', $request->barang_id)->latest()->first();
    
            $request->validate([
                'tgl_keluar' => ['required', 'date', $tanggalMasuk ? 'after_or_equal:' . $tanggalMasuk->tanggal_masuk : ''],
                'qty_keluar' => ['required', 'numeric', 'min:1', 'max:' . $currentStok],
                'barang_id' => ['required', 'exists:barang,id'],
            ], [
                'required' => ':attribute harus diisi',
                'min' => ':attribute minimal :min',
                'qty_keluar.max' => ':attribute tidak boleh melebihi stok barang. sisa stok:' . $currentStok
            ]);
    
            $barangKeluar = BarangKeluar::findOrFail($id);
    
            $barangKeluar->update([
                'tgl_keluar' => $request->tgl_keluar,
                'qty_keluar' => $request->qty_keluar,
                'barang_id' => $request->barang_id,
            ]);
    
            DB::commit();
    
            return Redirect::route('barangkeluar.index')->with('success', 'Barang keluar berhasil diubah');
        } catch (\Exception $e) {
            report($e);
            DB::rollBack();
            return Redirect::back()->with('error', 'Barang keluar gagal diubah!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $barangKeluar = BarangKeluar::findOrFail($id);
            $barangKeluar->delete();
    
            DB::commit();
    
            return Redirect::route('barangkeluar.index')->with('success', 'Barang keluar berhasil dihapus');
        } catch (\Exception $e) {
            report($e);
            DB::rollBack();
            return Redirect::back()->with('error', 'Barang keluar gagal dihapus!');
        }
    }
}
