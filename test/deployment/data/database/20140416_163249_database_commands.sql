ALTER TABLE "system$licenseinformation" RENAME TO "999bfe96c4bb42f4966c21ed57c37ddc";
ALTER TABLE "system$userlimitation" RENAME TO "942d78f6c0574457b35b197f0cedd593";
DROP INDEX "idx_system$userlimitation_licenseinformation_system$licenseinformation_system$userlimitation";
ALTER TABLE "system$userlimitation_licenseinformation" RENAME TO "cb4070051f614e3380f3687af1193d88";
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = '2094c41d-9a78-4f9b-a099-862521f8fd98';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = '2094c41d-9a78-4f9b-a099-862521f8fd98');
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = '2094c41d-9a78-4f9b-a099-862521f8fd98';
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = 'fc9a5209-0dd8-416a-b14e-0eb8a26d26fa';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = 'fc9a5209-0dd8-416a-b14e-0eb8a26d26fa');
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = 'fc9a5209-0dd8-416a-b14e-0eb8a26d26fa';
DELETE FROM "mendixsystem$association" 
 WHERE "id" = '397887de-0f05-4c7a-807a-07e07fcbbaa7';
DROP TABLE "999bfe96c4bb42f4966c21ed57c37ddc";
DROP TABLE "942d78f6c0574457b35b197f0cedd593";
DROP TABLE "cb4070051f614e3380f3687af1193d88";
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.0.7', 
"lastsyncdate" = '20140416 16:32:47';
