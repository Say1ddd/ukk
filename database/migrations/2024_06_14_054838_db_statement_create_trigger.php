<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // DB::statement("
        //     CREATE TRIGGER stok_masuk_insert AFTER INSERT ON barang_masuk
        //     FOR EACH ROW
        //     BEGIN
        //         UPDATE barang
        //         SET stok = stok + NEW.qty_masuk
        //         WHERE id = NEW.barang_id;
        //     END; +
        // ");
        // DB::statement("
        //     CREATE TRIGGER stok_masuk_delete BEFORE DELETE ON barang_masuk
        //     FOR EACH ROW
        //     BEGIN
        //         UPDATE barang
        //         SET stok = stok - OLD.qty_masuk
        //         WHERE id = OLD.barang_id;
        //     END;
        // ");
        // DB::statement("
        //     CREATE TRIGGER stok_masuk_update AFTER UPDATE ON barang_masuk
        //     FOR EACH ROW
        //     BEGIN
        //         UPDATE barang
        //         SET stok = stok + (NEW.qty_masuk - OLD.qty_masuk)
        //         WHERE id = NEW.barang_id;
        //     END;
        // ");
        // DB::statement("
        //     CREATE TRIGGER stok_keluar_insert AFTER INSERT ON barang_keluar
        //     FOR EACH ROW
        //     BEGIN
        //         UPDATE barang
        //         SET stok = stok - NEW.qty_keluar
        //         WHERE id = NEW.barang_id;
        //     END;
        // ");
        // DB::statement("
        //     CREATE TRIGGER stok_keluar_update AFTER UPDATE ON barang_keluar
        //     FOR EACH ROW
        //     BEGIN
        //         UPDATE barang
        //         SET stok = stok - (NEW.qty_keluar - OLD.qty_keluar)
        //         WHERE id = NEW.barang_id;
        //     END;
        // ");
        // DB::statement("
        //     CREATE TRIGGER stok_keluar_delete BEFORE DELETE ON barang_keluar
        //     FOR EACH ROW
        //     BEGIN
        //         UPDATE barang
        //         SET stok = stok + OLD.qty_keluar
        //         WHERE id = OLD.barang_id;
        //     END;
        // ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::dropIfExists('stok_masuk_insert');
        // Schema::dropIfExists('stok_masuk_delete');
        // Schema::dropIfExists('stok_masuk_update');
        // Schema::dropIfExists('stok_keluar_insert');
        // Schema::dropIfExists('stok_keluar_update');
        // Schema::dropIfExists('stok_keluar_delete');
    }
};
