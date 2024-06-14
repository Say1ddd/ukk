<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Barang;
use App\Models\BarangMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class BarangMasukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $barangmasuks = BarangMasuk::with('barang')->latest()->get();
        return Inertia::render('BarangMasuk/Index', [
            'barangmasuks' => $barangmasuks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $barangs = DB::table('barang')->get();

        return Inertia::render('BarangMasuk/Create', [
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
            $request->validate([
                'barang_id' => ['required', 'exists:barang,id'],
                'qty_masuk' => ['required', 'numeric', 'min:1'],
                'tgl_masuk' => ['required', 'date'],
            ]);

            BarangMasuk::create([
                'barang_id' => $request->barang_id,
                'qty_masuk' => $request->qty_masuk,
                'tgl_masuk' => $request->tgl_masuk,
            ]);

            DB::commit();
            
            return Redirect::route('barangmasuk.index')->with('success', 'Barang masuk berhasil ditambahkan');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->with('error', 'Barang masuk gagal ditambahkan' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id): Response
    {
        $barangMasuk = BarangMasuk::with('barang')->findOrFail($id);
    
        return Inertia::render('BarangMasuk/Show', [
            'barangmasuk' => $barangMasuk,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id): Response
    {
        $barangs = DB::table('barang')->get();

        $barangMasuk = DB::table('barang_masuk')->find($id);
    
        return Inertia::render('BarangMasuk/Edit', [
            'barangmasuk' => $barangMasuk,
            'barangs' => $barangs
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $currentStok = Barang::findOrFail($request->barang_id)->stok - BarangMasuk::findOrFail($id)->qty_masuk;
    
            $request->validate([
                'tgl_masuk' => ['required', 'date'],
                'qty_masuk' => ['required', 'numeric', 'min:' . $currentStok],
                'barang_id' => ['required', 'exists:barang,id'],
            ], [
                'required' => ':attribute harus diisi',
                'min' => ':attribute minimal :min',
            ]);
    
            $barangMasuk = BarangMasuk::findOrFail($id);
    
            $barangMasuk->update([
                'tgl_masuk' => $request->tgl_masuk,
                'qty_masuk' => $request->qty_masuk,
                'barang_id' => $request->barang_id,
            ]);
    
            DB::commit();
            return Redirect::route('barangmasuk.index')->with('success', 'Barang masuk berhasil diubah');
        } catch (\Exception $e) {
            report($e);
            DB::rollBack();
            return Redirect::back()->with('error', 'Barang masuk gagal diubah!' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $barangMasuk = BarangMasuk::findOrFail($id);
            $barangMasuk->delete();
    
            DB::commit();
            return Redirect::route('barangmasuk.index')->with('success', 'Barang masuk berhasil dihapus');
        } catch (\Exception $e) {
            report($e);
            DB::rollBack();
            return Redirect::back()->with('error', 'Barang masuk gagal dihapus!');
        }
    }
}
