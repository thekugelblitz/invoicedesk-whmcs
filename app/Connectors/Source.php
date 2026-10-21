<?php
declare(strict_types=1);
namespace InvoiceDesk\Connectors;
interface Source {
    public function test(): array;
    public function currencies(): array;
    public function page(array $filter,array $cursor): array;
    public function invoice(int $id): array;
    public function client(int $id): array;
    public function transactions(?int $client=null,?int $invoice=null): array;
    public function credits(int $client): array;
}
