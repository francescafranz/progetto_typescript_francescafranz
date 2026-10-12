
# Sunnee - Brand di beachwear sostenibile

Progetto TypeScript realizzato per [start2impact University](https://www.start2impact.it).

## Descrizione
Il progetto modella la struttura operativa di Sunnee, brand fittizio che realizza beachwear con plastica riciclata (reti da pesca dismesse, bottiglie e tappi recuperati in mare).

In particolare, il sistema rappresenta le interazioni tra prodotti, clienti e processi di produzione tramite interfacce e classi.


## Struttura del codice
Tutto il codice è nel file `sunnee.ts`, diviso in sezioni:
1. Interfacce
    - `IProdotto`: tipo, ID, taglia, colore, stato, cliente assegnato, metodo `assegnaCliente`.
    - `ICliente`: nome, cognome, email, metodo di pagamento, metodo `ordinaProdotto`.
    - `IProcessoProduzione`: nome, descrizione, prodotti in produzione, metodo `aggiungiProdotto`.
2. Classi che implementano le interfacce: `Prodotto`, `Cliente`, `ProcessoProduzione`.
3. Istanze e test: creazione di prodotti, clienti e processi, ordini e aggiunta di articoli.


## Logica principale
- `Cliente.ordinaProdotto` verifica che il prodotto sia disponibile e, in caso positivo, chiama `Prodotto.assegnaCliente`. Altrimenti stampa un messaggio di rifiuto.
- `Prodotto.assegnaCliente` imposta lo stato a "ordinato" e salva il cliente assegnato.
- `ProcessoProduzione.aggiungiProdotto`:
    - se il prodotto è nuovo, lo aggiunge al processo;
    - se è già presente ed era ordinato, torna "disponibile" (riassortimento);
    - se è già presente e disponibile, non cambia nulla.
- `ProcessoProduzione.prodottiDisponibili` restituisce solo i prodotti con stato "disponibile".

## Requisiti
Node.js 18 o superiore (include npm)

## Installazione

Clona il repository:
```bash
git clone https://github.com/francescafranz/progetto_typescript_francescafranz.git
```

Entra nella cartella:
```bash
cd progetto_typescript_francescafranz
```

Installa le dipendenze:
```bash
npm install
```

Esecuzione con npm:
```bash
npm start
```

Oppure esecuzione direttamente con tsx:
```bash
npx tsx sunnee.ts
```

L'output verrà stampato nel terminale.

## Esecuzione online

Il progetto è inoltre disponibile su CodePen a [questo link](https://codepen.io/francescafranz/pen/ByWYYqR).
Qui il progetto partirà in automatico: basterà aprire la Console di CodePen per vedere l'output.


## Autrice
Francesca Franz

