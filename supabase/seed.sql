-- Wood & Steak Seed Data

-- Categories
INSERT INTO categories (id, name, slug, description, image_url, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Steaky', 'steaky', 'Premiove kusy hovezich steaku - dry-aged, Black Angus, Wagyu', NULL, 1),
  ('a1000000-0000-0000-0000-000000000002', 'Hovezi maso', 'hovezi-maso', 'Kvalitni hovezi maso pro peclive pripravena jidla', NULL, 2),
  ('a1000000-0000-0000-0000-000000000003', 'Domaci omacky', 'domaci-omacky', 'Autenticke omacky primo z nasi restauracni kuchyne', NULL, 3),
  ('a1000000-0000-0000-0000-000000000004', 'Marinady a koreni', 'marinady-a-koreni', 'Steak rubs, soli a marinady pro dokonalou chut', NULL, 4),
  ('a1000000-0000-0000-0000-000000000005', 'Noze a vybaveni', 'noze-a-vybaveni', 'Steakove noze, prkenka a grilovaci prislusenstvi', NULL, 5),
  ('a1000000-0000-0000-0000-000000000006', 'Doplnky', 'doplnky', 'Maslo na steak, oleje, sul Maldon a dalsi', NULL, 6);

-- Products: Steaky
INSERT INTO products (name, slug, description, short_description, category_id, price, unit, weight_info, stock_status, is_featured, badge, sort_order) VALUES
  ('Rib Eye Black Angus dry-aged', 'rib-eye-black-angus-dry-aged', 'Skvele mramorovany Rib Eye z Black Angus, zrajici 28 dni v nasi zracim boxu. Intenzivni chut s maslovou texturou. Idealni na gril nebo litinovou panev.', 'Dry-aged 28 dni, intenzivni chut', 'a1000000-0000-0000-0000-000000000001', 1890, 'kg', '1 kg', 'in_stock', true, 'Bestseller', 1),
  ('Sirloin steak premium', 'sirloin-steak-premium', 'Klasicky svickovy steak s jemnou texturou a vyraznou chuti. Idealni pro ty, kteri preferuji nizsi obsah tuku s maximem chuti.', 'Jemna textura, vyrazna chut', 'a1000000-0000-0000-0000-000000000001', 1490, 'kg', '1 kg', 'in_stock', true, NULL, 2),
  ('T-bone steak', 't-bone-steak', 'Dva steaky v jednom - na jedne strane svickova, na druhe rostena. Imponatni kus masa pro opravdove milovniky steaku.', 'Svickova + rostena v jednom', 'a1000000-0000-0000-0000-000000000001', 1690, 'kg', '800 g', 'in_stock', false, NULL, 3),
  ('Tomahawk steak', 'tomahawk-steak', 'Spektakularni steak s dlouhou kosti, ktery ohuromi na kazdem grilovanim. Mramorovany, stavnaty a vizualne nezapomenutelny.', 'Steak s dlouhou kosti, 1.2 kg', 'a1000000-0000-0000-0000-000000000001', 2290, 'kg', '1.2 kg', 'on_order', true, 'Na objednavku', 4),
  ('Picanha', 'picanha', 'Brazilsky specialita s tukovou capickou, ktera pri grilovani vytvari neodolatelnou chut. Oblibeny kus pro reverse sear.', 'Brazilska klasika s tukovou capickou', 'a1000000-0000-0000-0000-000000000001', 990, 'kg', '1 kg', 'in_stock', false, NULL, 5),
  ('Flank steak', 'flank-steak', 'Libovy a chutny kus z briska. Idealni na marinovanim a rychle opecenym na vysokem zaru. Kraje se proti vlaknum.', 'Libovy, idealni na marinady', 'a1000000-0000-0000-0000-000000000001', 890, 'kg', '1 kg', 'in_stock', false, NULL, 6);

-- Products: Hovezi maso
INSERT INTO products (name, slug, description, short_description, category_id, price, unit, weight_info, stock_status, is_featured, sort_order) VALUES
  ('Svickova hovezi', 'svickova-hovezi', 'Nejjemnejsi cast hoveziny, idealni na klasickou svickovou na smetane nebo na tatarsky biftek.', 'Nejjemnejsi cast hoveziny', 'a1000000-0000-0000-0000-000000000002', 1290, 'kg', '1 kg', 'in_stock', false, 1),
  ('Roast beef', 'roast-beef', 'Premium kus na pomale peceni. Po spravne priprave stavnaty a jemny roast beef jako z anglicke tradice.', 'Na pomale peceni', 'a1000000-0000-0000-0000-000000000002', 890, 'kg', '1 kg', 'in_stock', false, 2),
  ('Hovezi mlete premium', 'hovezi-mlete-premium', 'Cerstve mlete hovezi z kvalitniho masa. Idealni na burgery, bolognese nebo steak tartare.', 'Cerstve mlete, 20% tuku', 'a1000000-0000-0000-0000-000000000002', 490, 'kg', '500 g', 'in_stock', false, 3);

-- Products: Domaci omacky
INSERT INTO products (name, slug, description, short_description, category_id, price, unit, weight_info, stock_status, is_featured, sort_order) VALUES
  ('BBQ omacka domaci', 'bbq-omacka-domaci', 'Nase autorska BBQ omacka s vyraznou uzeny chuti, medem a hint chipotle. Vyrabena rucne v nasi restauracni kuchyni.', 'Autorska receptura, uzena chut', 'a1000000-0000-0000-0000-000000000003', 220, 'ks', '250 ml', 'in_stock', true, 1),
  ('Peppercorn omacka', 'peppercorn-omacka', 'Klasicka smetanova omacka se zelenym peprem. Dokonaly doprovod k jakemukoli steaku, obzvlast k Sirloin.', 'Kremova se zelenym peprem', 'a1000000-0000-0000-0000-000000000003', 240, 'ks', '250 ml', 'in_stock', false, 2),
  ('Chimichurri', 'chimichurri', 'Argentinska bylinkova omacka z cerstvé petrzele, oregana, cesneku a olivoveho oleje. Osvezujici a aromaticka.', 'Argentinska bylinkova klasika', 'a1000000-0000-0000-0000-000000000003', 220, 'ks', '250 ml', 'in_stock', false, 3),
  ('Demi-glace tmava', 'demi-glace-tmava', 'Koncentrovana tmava omacka varena 48 hodin z hovezich kosti. Zaklad francouzske kuchyne pro luxusni omacky.', 'Varena 48 hodin z hovezich kosti', 'a1000000-0000-0000-0000-000000000003', 280, 'ks', '250 ml', 'in_stock', true, 4);

-- Products: Marinady a koreni
INSERT INTO products (name, slug, description, short_description, category_id, price, unit, weight_info, stock_status, is_featured, sort_order) VALUES
  ('Steak rub Wood & Steak', 'steak-rub-wood-and-steak', 'Nase signaturni koreni smes pro steaky. Hruba sul, cerny pepr, cesnek, cibule a tajne byliny.', 'Signaturni smes pro steaky', 'a1000000-0000-0000-0000-000000000004', 180, 'ks', '100 g', 'in_stock', true, 1),
  ('Sul Maldon Smoked', 'sul-maldon-smoked', 'Uzena morska sul Maldon v vlockovite forme. Dokonale finalni dochuceni steaku pred podavanim.', 'Uzena vlockovita morska sul', 'a1000000-0000-0000-0000-000000000004', 150, 'ks', '125 g', 'in_stock', false, 2);

-- Products: Noze a vybaveni
INSERT INTO products (name, slug, description, short_description, category_id, price, unit, weight_info, stock_status, is_featured, sort_order) VALUES
  ('Steakovy nuz Wusthof Classic', 'steakovy-nuz-wusthof-classic', 'Nemecky steakovy nuz Wusthof z vysoko legované oceli. Ostra cepel pro dokonaly rez masem bez trhani vlaken.', 'Nemecka kvalita, ostra cepel', 'a1000000-0000-0000-0000-000000000005', 2890, 'ks', NULL, 'in_stock', true, 1),
  ('Sada 4 steakovych nozu', 'sada-4-steakovych-nozu', 'Elegantni sada ctyr steakovych nozu v darkovem baleni. Kvalitni ocel, ergonomicka rukojest z duboveho dreva.', 'Darkova sada, dubova rukojest', 'a1000000-0000-0000-0000-000000000005', 4500, 'ks', NULL, 'in_stock', false, 2),
  ('Dubove prkenko velke', 'dubove-prkenko-velke', 'Masivni dubove prkenko s drázkou na stavu. Rucne vyrabene v Ceske republice. Rozmer 45x30 cm.', 'Rucne vyrobene, 45x30 cm', 'a1000000-0000-0000-0000-000000000005', 1290, 'ks', NULL, 'in_stock', false, 3);

-- Products: Doplnky
INSERT INTO products (name, slug, description, short_description, category_id, price, unit, weight_info, stock_status, is_featured, sort_order) VALUES
  ('Steakove maslo s rozmarýnem', 'steakove-maslo-s-rozmaryne', 'Domaci slazenem maslo s cerstvym rozmarynem a morksa soli. Rozpusti se na horkem steaku a vytvori luxusni finish.', 'Domaci, s rozmarynem a soli', 'a1000000-0000-0000-0000-000000000006', 120, 'ks', '100 g', 'in_stock', false, 1),
  ('Extra panensky olivovy olej', 'extra-panensky-olivovy-olej', 'Italsky extra panensky olivovy olej z Toskanska. Idealni na final dressing steaku a salatove prilohy.', 'Toskansky, cold-pressed', 'a1000000-0000-0000-0000-000000000006', 380, 'ks', '500 ml', 'in_stock', false, 2),
  ('Cerstvý rozmaryn svazek', 'cerveny-rozmaryn-svazek', 'Cerství rozmaryn pro aromaticke grilovani. Pouzijte jako stetec na masloa na priprave steaku.', 'Cerství, na grilovani', 'a1000000-0000-0000-0000-000000000006', 45, 'ks', '1 svazek', 'in_stock', false, 3);

-- Site settings
INSERT INTO site_settings (key, value) VALUES
  ('min_order_amount', '500'),
  ('delivery_areas', '["Praha a okoli", "Praha-vychod", "Mlada Boleslav", "Kladno", "Melnik", "Nymburk"]'),
  ('store_address', '{"company": "Wood & Steak", "street": "Vinohrady", "city": "Praha 2", "zip": "120 00", "note": "Restaurace u Namesti Miru"}'),
  ('contact', '{"email": "info@woodandsteak.cz", "phone": "+420 XXX XXX XXX"}'),
  ('social_links', '{"instagram": "https://instagram.com/woodandsteak", "facebook": ""}'),
  ('restaurant_url', '"https://www.woodandsteak.cz/"'),
  ('shipping_free_threshold', '0'),
  ('shipping_price', '0'),
  ('business_info', '{"company": "Wood & Steak s.r.o.", "ico": "XXXXXXXX", "dic": "CZXXXXXXXX"}');
