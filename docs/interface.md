# Interface

## Region
It starts with a dropdown to choose which Distrito the user's crop is in, based on the following regions:
* Region 1: litoral norte e centro
* Region 2: interior norte e serras
* Region 3: Lisboa, Setúbal e Vale do Tejo
* Region 4: Alentejo e Beira Baixa
* Region 5: Algarve
* Region 6: Madeira e Açores

Check the [regions](./regions.webp) for more information about the regions.
With the users permission, it can guess the region based on the user's location.
**Confirmed by Agent:** These 6 regions match the standard agro-climatic zones of Portugal as referenced in `regions.webp` (hortasbiologicas.pt), comprehensively mapping all 18 mainland districts plus the 2 autonomous island regions (Açores and Madeira).

## Month
A Month must be selected. Either by the user, or based on today's date

## Cultures

There are two views. One based on the selected month and the other based on the selected culture.

### Based on the month 
It shows a table, for the month and region selected, with the following fields:

| Field      | Examples                                         | Description        
|------------|--------------------------------------------------|------------
| Culture    | Alface, Cebola, Batata, etc                      | Types of cultures
| Ação       | Sementeira direta, viveiro, Plantar, Colher      | Action to take     
| Month      | Jan, Fev, Mar, etc                               | Months to take the action for that culture

### Based on the culture
It shows an autocomplete with every culture in the database.
By selecting one, it shows wich months to plant, seed and harvest, for the selected region.