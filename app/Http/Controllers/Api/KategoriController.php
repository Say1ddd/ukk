<?php

namespace App\Http\Controllers\Api;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $kategoris = Kategori::get();
        return response()->json(["data" => $kategoris]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'kategori' => ['required', 'max:255', 'unique:kategori,kategori'],
            'deskripsi' => ['required', 'max:255']
        ], [
            'required' => ':attribute harus diisi',
            'unique' => ':attribute sudah ada'
        ]);
    
        $kategori = $request->kategori;
    
        $create = Kategori::create([
            'deskripsi' => $request->deskripsi,
            'kategori' => $kategori
        ]);
    
        return response()->json([
            'message' => 'Kategori berhasil dibuat',
            'data' => $create
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $kategori = Kategori::where($id)->first();
        if (!$kategori) {
            return response()->json(['status' => 'Kategori tidak ditemukan'], 404);
        }
        return response()->json(["data" => $kategori]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kategori $kategori)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategori $kategori)
    {
        //
    }
}
