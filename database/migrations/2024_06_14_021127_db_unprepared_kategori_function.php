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
        DB::unprepared('
            CREATE FUNCTION `get_kategori`(`kategori` VARCHAR(4))
            RETURNS VARCHAR(20)
            DETERMINISTIC
            BEGIN
                DECLARE result VARCHAR(20);
                IF kategori = "M" THEN
                    SET result = "Modal";
                ELSEIF kategori = "A" THEN
                    SET result = "Alat";
                ELSEIF kategori = "BHP" THEN
                    SET result = "Barang Habis Pakai";
                ELSEIF kategori = "BTHP" THEN
                    SET result = "Barang Tidak Habis Pakai";
                ELSE
                    SET result = "Tidak Diketahui";
                END IF;
                RETURN result;
            END'
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP FUNCTION IF EXISTS `get_kategori`');
    }
};
