# Wohnungssuche

 ## ToDo
  
  - [x] Login logic

  - [x] complete database

  - [x] basic page for a single flat (url arguments for data retrival)

  - [x] search logic (SQL statements)

  - [x] implement search logic in UI

  - [ ] basic list layout for multiple flats

  - [ ] account page

  - [ ] Requests

  - [ ] start page

  - [x] let user create a flat

 ## SQL statements

 

    Preis niedrigste
    SELECT * 
    FROM flat 
    ORDER BY price ASC
    Limit 0 , 20;
     
    Preis höchste
    SELECT * 
    FROM flat 
    ORDER BY price DESC
    Limit 0 , 20;
     
    Räume höchste
    SELECT * 
    FROM flat 
    ORDER BY rooms DESC
    Limit 0 , 20;
     
    Räume niedrigste
    SELECT * 
    FROM flat 
    ORDER BY rooms ASC
    Limit 0 , 20;
     
    Area größte
    SELECT * 
    FROM flat 
    ORDER BY area DESC
    Limit 0 , 20;
     
     
     
    Area kleinste
    SELECT * 
    FROM flat 
    ORDER BY area ASC
    Limit 0 , 20;
     
    Verfügbarkeit früh
    SELECT * 
    FROM flat 
    ORDER BY rooms ASC
    Limit 0 , 20;
     
    Verfügbarkeit spät
    SELECT * 
    FROM flat 
    ORDER BY rooms DESC
    Limit 0 , 20;
     
    Preis zwischen
    SELECT * FROM flat WHERE PreisUG <= price AND price <=PreisOG;
     
    Räume zwischen
    SELECT * FROM flat WHERE RäumeUG <= rooms AND rooms <=RäumeOG;
     
    Fläche zwischen
    SELECT * FROM flat WHERE FlächeUG <= area AND area <=FlächeOG;
     
    Verfügbarkeit  zwischen
    SELECT * FROM flat WHERE VerfügbarkeitStart <= available_from AND available_from <= VerfügbarkeitEnde;
     
     
    Stadt suchen
    SELECT * FROM flat WHERE city = ?;
     

 
