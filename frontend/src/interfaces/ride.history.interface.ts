export interface IRideHistory {

    fetchRideHistory (selectedDriverId?: string): Promise<void>;
    handleDriverChange (e: React.ChangeEvent<HTMLSelectElement>): void;
    handleFilter (e: React.FormEvent<HTMLFormElement>): void;

}