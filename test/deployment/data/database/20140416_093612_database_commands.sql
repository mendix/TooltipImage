CREATE TABLE "myfirstmodule$settings" (
	"id" BIGINT NOT NULL,
	"showadditionaldata" BOOLEAN NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", 
"entity_name", 
"table_name")
 VALUES ('5ad480ce-eae3-46f5-8757-7f588f4a261b', 
'MyFirstModule.Settings', 
'myfirstmodule$settings');
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('defdd685-87e1-497c-9751-97f9250b5d66', 
'5ad480ce-eae3-46f5-8757-7f588f4a261b', 
'ShowAdditionalData', 
'showadditionaldata', 
10, 
200, 
'false', 
false);
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.0.7', 
"lastsyncdate" = '20140416 09:36:06';
