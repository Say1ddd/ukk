<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategoris = DB::table('kategori')->get();
        return Inertia::render('Kategori/Index', [
            'kategoris' => $kategoris,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kategori/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'deskripsi' => ['required', 'string'],
                'kategori' => ['required', 'in:M,A,BHP,BTHP'],
            ]);

            Kategori::create([
                'deskripsi' => $request->deskripsi,
                'kategori' => $request->kategori,
            ]);

            DB::commit();
            return Redirect::route('kategori.index')->with('success', 'Kategori berhasil ditambahkan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Kategori $kategori)
    {
        $kategori = DB::table('kategori')->where('id', $kategori->id)->first();
        return Inertia::render('Kategori/Show', [
            'kategori' => $kategori,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kategori $kategori)
    {
        return Inertia::render('Kategori/Edit', [
            'kategori' => $kategori,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kategori $kategori)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'deskripsi' => ['required', 'string'],
                'kategori' => ['required', 'in:M,A,BHP,BTHP'],
            ]);

            $kategori->update([
                'deskripsi' => $request->deskripsi,
                'kategori' => $request->kategori,
            ]);

            DB::commit();
            return Redirect::route('kategori.index')->with('success', 'Kategori berhasil diubah.');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategori $kategori)
    {
        DB::beginTransaction();
        try {
            $kategori->delete();
            DB::commit();
            return Redirect::route('kategori.index')->with('success', 'Kategori berhasil dihapus.');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->with('error', $e->getMessage());
        }
    }
}
