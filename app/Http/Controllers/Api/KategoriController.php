<?php

namespace App\Http\Controllers\Api;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
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
        DB::beginTransaction();
        try {
            $request->validate([
                'deskripsi' => ['required', 'string'],
                'kategori' => ['required', 'in:M,A,BHP,BTHP'],
            ], [
                'required' => ':attribute harus diisi',
                'unique' => ':attribute sudah ada'
            ]);

            Kategori::create([
                'kategori' => $request->kategori,
                'deskripsi' => $request->deskripsi
            ]);

            DB::commit();
            return response()->json(['status' => 'Kategori berhasil ditambahkan']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'Kategori gagal ditambahkan',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $kategori = Kategori::find($id);
        if (!$kategori) {
            return response()->json(['status' => 'Kategori tidak ditemukan'], 404);
        }
        return response()->json(["data" => $kategori]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $kategori = Kategori::find($id);
            if (!$kategori) {
                return response()->json(['status' => 'Kategori tidak ditemukan'], 404);
            }
            $request->validate([
                'deskripsi' => ['required', 'string'],
                'kategori' => ['required', 'in:M,A,BHP,BTHP'],
            ], [
                'required' => ':attribute harus diisi',
                'unique' => ':attribute sudah ada'
            ]);

            $kategori->update([
                'kategori' => $request->kategori,
                'deskripsi' => $request->deskripsi
            ]);

            DB::commit();
            return response()->json(['status' => 'Kategori berhasil diubah']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'Kategori gagal diubah',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $kategori = Kategori::find($id);
            if (!$kategori) {
                return response()->json(['status' => 'Kategori tidak ditemukan'], 404);
            }
            $kategori->delete();
            DB::commit();
            return response()->json(['status' => 'Kategori berhasil dihapus']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'Kategori gagal dihapus',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
