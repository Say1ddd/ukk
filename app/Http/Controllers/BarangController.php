<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Barang;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // $barangs = DB::table('barang')
        //     ->join('kategori', 'barang.kategori_id', '=', 'kategori.id')
        //     ->select('barang.*', 'kategori.deskripsi')
        //     ->get();
        $barangs = Barang::with('kategori')->get();

            return Inertia::render('Barang/Index', [
            'barangs' => $barangs,
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $kategoris = DB::table('kategori')->get();

        return Inertia::render('Barang/Create', [
            'kategoris' => $kategoris,
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
            'merk' => ['required', 'max:50'],
            'seri' => ['required','max:50'],
            'spesifikasi' => ['required'],
            'stok' => ['required', 'numeric'],
            'kategori_id' => ['required', 'exists:kategori,id'],
        ]);

        Barang::create($request->all());

        DB::commit();
        return redirect()->route('barang.index')->with('success', 'Barang berhasil ditambahkan');
        } catch (\Exception $e) {
        DB::rollBack();
        return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Barang $barang): Response
    {
        $barang->load('kategori');
        return Inertia::render('Barang/Show', [
            'barang' => $barang,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barang $barang): Response
    {
        $barang->load('kategori');
        $kategoris = DB::table('kategori')->get();

        return Inertia::render('Barang/Edit', [
            'barang' => $barang,
            'kategoris' => $kategoris,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Barang $barang): RedirectResponse
    {
        DB::beginTransaction();
        try {
        $request->validate([
            'merk' => ['required', 'max:50'],
            'seri' => ['required','max:50'],
            'spesifikasi' => ['required'],
            'stok' => ['required', 'numeric'],
            'kategori_id' => ['required', 'exists:kategori,id'],
        ]);

        $barang->update($request->all());

        DB::commit();
        return redirect()->route('barang.index')->with('success', 'Barang berhasil diubah');
        } catch (\Exception $e) {
        DB::rollBack();
        return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barang $barang): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $barang->delete();
            DB::commit();
            return redirect()->route('barang.index')->with('success', 'Barang berhasil dihapus');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
