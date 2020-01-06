export interface ILigneFacture {
    IdFacture: number;
    IdLigne: number;
    IdFactuIdProduitre: number;
    position: number;
    Designation: string;
    Prix: number;
    Qte: number;
    TVA: number;
    MontantHT: number;
    MontantTTC: number;
}
