<?php

namespace App\Http\Controllers;

use App\Models\BarangMasuk;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class BarangMasukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $barangmasuks = BarangMasuk::with('barang')->get();

        return Inertia::render('BarangMasuk/Index', [
            'barangMasuk' => $barangmasuks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $barangmasuks = DB::table('barang_masuk')->get();
        $barangs = DB::table('barang')->get();

        return Inertia::render('BarangMasuk/Create', [
            'barangMasuk' => $barangmasuks,
            'barang' => $barangs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'barang_id' => ['required', 'exists:barang,id'],
                'jumlah' => ['required', 'numeric', 'min:1'],
                'tanggal' => ['required', 'date'],
            ]);

            BarangMasuk::create([
                'barang_id' => $request->barang_id,
                'jumlah' => $request->jumlah,
                'tanggal' => $request->tanggal,
            ]);

            DB::commit();
            
            return redirect()->route('barang-masuk.index')->with('success', 'Barang masuk berhasil ditambahkan');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('barang-masuk.index')->with('error', 'Barang masuk gagal ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(BarangMasuk $barangMasuk): Response
    {
        $barangmasuk = BarangMasuk::with('barang')->find($barangMasuk->id);

        return Inertia::render('BarangMasuk/Show', [
            'barangMasuk' => $barangmasuk,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BarangMasuk $barangMasuk): Response
    {
        $barangmasuk = BarangMasuk::with('barang')->find($barangMasuk->id);

        return Inertia::render('BarangMasuk/Edit', [
            'barangMasuk' => $barangmasuk,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BarangMasuk $barangMasuk): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'barang_id' => ['required', 'exists:barang,id'],
                'jumlah' => ['required', 'numeric', 'min:1'],
                'tanggal' => ['required', 'date'],
            ]);

            $barangMasuk->update([
                'barang_id' => $request->barang_id,
                'jumlah' => $request->jumlah,
                'tanggal' => $request->tanggal,
            ]);

            DB::commit();
            
            return redirect()->route('barang-masuk.index')->with('success', 'Barang masuk berhasil diubah');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('barang-masuk.index')->with('error', 'Barang masuk gagal diubah');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BarangMasuk $barangMasuk): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $barangMasuk->delete();
            DB::commit();
            
            return redirect()->route('barang-masuk.index')->with('success', 'Barang masuk berhasil dihapus');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('barang-masuk.index')->with('error', 'Barang masuk gagal dihapus');
        }
    }
}
