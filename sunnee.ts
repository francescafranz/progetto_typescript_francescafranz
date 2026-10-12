//#region INTERFACES

interface IProdotto {
  tipo: string; //"costume da bagno", "pareo", "cappello"
  id: number; //ID univoco
  taglia: string; // "XS", "S", "M", "L", "XL"
  colore: string;
  stato: string; //"disponibile", "ordinato"
  clienteAssegnato: ICliente | null;

  assegnaCliente(cliente: ICliente): void;
}


interface ICliente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamento: string;

  ordinaProdotto(prodotto: IProdotto): void;
}


interface IProcessoProduzione {
  nome: string;
  descrizione: string;
  prodottiInProduzione: IProdotto[];

  aggiungiProdotto(prodotto: IProdotto): void;
}

//#endregion

//#region CLASSES

class Prodotto implements IProdotto {
  tipo: string;
  id: number;
  taglia: string;
  colore: string;
  stato: string;
  clienteAssegnato: ICliente | null = null;

  constructor (tipo: string, id: number, taglia: string, colore: string) {
    this.tipo = tipo;
    this.id = id;
    this.taglia = taglia;
    this.colore = colore;
    this.stato = "disponibile";
  }

  assegnaCliente(cliente: ICliente): void {
    if (this.stato === "disponibile") {
      this.stato = "ordinato";
      this.clienteAssegnato = cliente;
      console.log(`Il prodotto ${this.tipo} (ID: ${this.id}, taglia: ${this.taglia}, colore: ${this.colore}) è stato ordinato da ${cliente.nome} ${cliente.cognome}`);
    } else {
      console.log(`Il prodotto ${this.tipo} (ID: ${this.id}, taglia: ${this.taglia}, colore: ${this.colore}) non è disponibile`);
    }
  }
}

class Cliente implements ICliente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamento: string;

  constructor (nome: string, cognome: string, email: string, metodoPagamento: string) {
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.metodoPagamento = metodoPagamento;
  }

  ordinaProdotto(prodotto: IProdotto): void {
    if(prodotto.stato === "disponibile") {
      prodotto.assegnaCliente(this);
    } else {
      console.log(`${this.nome} ${this.cognome} non può ordinare il prodotto ${prodotto.tipo} (ID: ${prodotto.id}, taglia: ${prodotto.taglia}, colore: ${prodotto.colore}) perché non è disponibile`);
    }
  }
  
}

class ProcessoProduzione implements IProcessoProduzione {
  nome: string;
  descrizione: string;
  prodottiInProduzione: IProdotto[] = [];

  constructor (nome: string, descrizione: string) {
    this.nome = nome;
    this.descrizione = descrizione;
  }

  aggiungiProdotto(prodotto: IProdotto): void {
    if (this.prodottiInProduzione.some(p => p.id === prodotto.id)) {
      if(prodotto.stato === "ordinato") {
        prodotto.stato = "disponibile";
        prodotto.clienteAssegnato = null;
        console.log(`Il prodotto ${prodotto.tipo} con ID ${prodotto.id} era già presente nel processo ${this.nome} ed è di nuovo disponibile`);
      } else {
        console.log(`Il prodotto ${prodotto.tipo} (ID: ${prodotto.id}) è già presente e disponibile`);
      }
    } else {
      this.prodottiInProduzione.push(prodotto);
      console.log(`Aggiunto ${prodotto.tipo} (ID: ${prodotto.id}, taglia: ${prodotto.taglia}, colore: ${prodotto.colore}) al processo di produzione ${this.nome}`);
    }
  }

  //filtra solo i prodotti disponibili
  get prodottiDisponibili(): IProdotto[] {
    return this.prodottiInProduzione.filter(p => p.stato === "disponibile");
  }
}

//#endregion

//#region INSTANTIATION AND TESTING


//Istanziazione di alcuni oggetti Prodotto

const bikiniReteXS = new Prodotto("bikini", 10001, "XS", "blu");
const bikiniReteS = new Prodotto("bikini", 10002, "S", "blu");
const bikiniReteM = new Prodotto("bikini", 10003, "M", "blu");
const bikiniReteL = new Prodotto("bikini", 10004, "L", "blu");
const bikiniReteXL = new Prodotto("bikini", 10005, "XL", "blu");

const cappelloBottXS = new Prodotto("cappello", 20001, "XS", "nero");
const cappelloBottS = new Prodotto("cappello", 20002, "S", "nero");
const cappelloBottM = new Prodotto("cappello", 20003, "M", "nero");
const cappelloBottL = new Prodotto("cappello", 20004, "L", "nero");
const cappelloBottXL = new Prodotto("cappello", 20005, "XL", "nero");


//Istanziazione di alcuni oggetti Cliente

const cliente1 = new Cliente("Gianandrea", "Rossi", "gian.rossi@gmail.com", "PayPal");
const cliente2 = new Cliente("Lucia", "Verdi", "l.verdi@gmail.com", "Carta bancaria");
const cliente3 = new Cliente("Andrea", "Neri", "andrea.neri@gmail.com", "Stripe");


//Istanziazione di alcuni processi di produzione

const produzioneBikini = new ProcessoProduzione("Produzione bikini", "I bikini sono tutti prodotti con materiale ricavato dalle reti da pesca recuperate in mare");
const produzioneCappelli = new ProcessoProduzione("Produzione cappelli", "I cappelli vengono tutti prodotti con materiale ricavato dalle bottiglie di plastica e dai tappi recuperati in mare");


//Aggiunta dei prodotti al processo di produzione corrispondente

produzioneBikini.aggiungiProdotto(bikiniReteXS);
produzioneBikini.aggiungiProdotto(bikiniReteS);
produzioneBikini.aggiungiProdotto(bikiniReteM);
produzioneBikini.aggiungiProdotto(bikiniReteL);
produzioneBikini.aggiungiProdotto(bikiniReteXL);

console.log(`Bikini disponibili sul sito: ${produzioneBikini.prodottiDisponibili.length}`);
console.log(`Bikini totali in produzione: ${produzioneBikini.prodottiInProduzione.length}`); 


produzioneCappelli.aggiungiProdotto(cappelloBottXS);
produzioneCappelli.aggiungiProdotto(cappelloBottS);
produzioneCappelli.aggiungiProdotto(cappelloBottM);
produzioneCappelli.aggiungiProdotto(cappelloBottL);
produzioneCappelli.aggiungiProdotto(cappelloBottXL);

console.log(`Cappelli disponibili sul sito: ${produzioneCappelli.prodottiDisponibili.length}`);
console.log(`Cappelli totali in produzione: ${produzioneCappelli.prodottiInProduzione.length}`); 


//Ordini Clienti test

cliente1.ordinaProdotto(bikiniReteS);
cliente2.ordinaProdotto(cappelloBottM);
cliente3.ordinaProdotto(cappelloBottM); //non dovrebbe funzionare

console.log(`Bikini ora disponibili:${produzioneBikini.prodottiDisponibili.length}`);
console.log(`Bikini totali in produzione: ${produzioneBikini.prodottiInProduzione.length}`); 

console.log(`Cappelli ora disponibili:${produzioneCappelli.prodottiDisponibili.length}`);
console.log(`Cappelli totali in produzione: ${produzioneCappelli.prodottiInProduzione.length}`); 


//Test aggiunta prodotto mancante

if(bikiniReteL.stato === "ordinato") {
  produzioneBikini.aggiungiProdotto(bikiniReteL);
  console.log(`Bikini ora disponibili: ${produzioneBikini.prodottiDisponibili.length}`);
  console.log(`Bikini totali in produzione: ${produzioneBikini.prodottiInProduzione.length}`); 
} else {
  console.log(`Il bikini in taglia ${bikiniReteL.taglia} è già disponibile`);
}

if(cappelloBottM.stato === "ordinato") {
  produzioneCappelli.aggiungiProdotto(cappelloBottM);
  console.log(`Cappelli disponibili: ${produzioneCappelli.prodottiDisponibili.length}`);
  console.log(`Cappelli totali in produzione: ${produzioneCappelli.prodottiInProduzione.length}`); 
} else {
  console.log(`I cappelli in taglia ${cappelloBottM.taglia} sono già disponibili`);
}


//Aggiunta nuovo articolo

produzioneCappelli.aggiungiProdotto(new Prodotto("cappello", 20006, "M", "fantasia")); 
console.log(`Cappelli totali in produzione: ${produzioneCappelli.prodottiInProduzione.length}`);

//#endregion