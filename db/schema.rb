# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_17_052611) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.integer "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "arm_groups", force: :cascade do |t|
    t.integer "trial_id"
    t.string "label"
    t.string "group_type"
    t.string "description"
    t.string "intervention_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "conditions", force: :cascade do |t|
    t.integer "trial_id"
    t.string "condition"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "documents", force: :cascade do |t|
    t.integer "patient_id"
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "document_url"
  end

  create_table "locations", force: :cascade do |t|
    t.integer "trial_id"
    t.string "facility"
    t.string "state"
    t.string "zip"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "city"
  end

  create_table "measurements", force: :cascade do |t|
    t.integer "patient_id"
    t.date "date"
    t.integer "measurement"
    t.string "measurement_label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notes", force: :cascade do |t|
    t.integer "patient_id"
    t.date "date"
    t.string "title"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "outcomes", force: :cascade do |t|
    t.integer "trial_id"
    t.string "outcome_type"
    t.string "outcome_measure"
    t.string "outcome_description"
    t.string "outcome_timeframe"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "patients", force: :cascade do |t|
    t.integer "trial_id"
    t.string "first_name"
    t.string "last_name"
    t.string "address"
    t.string "gender"
    t.string "weight"
    t.string "height"
    t.string "age"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "placebo"
  end

  create_table "trials", force: :cascade do |t|
    t.string "NCTId"
    t.string "organization_name"
    t.string "brief_title"
    t.string "official_title"
    t.string "overall_status"
    t.string "start_date"
    t.string "primary_completion_date"
    t.string "primary_completion_date_type"
    t.string "lead_sponsor"
    t.string "is_fda_regulated_drug"
    t.string "is_fda_regulated_device"
    t.string "brief_summary"
    t.string "detailed_description"
    t.string "study_type"
    t.string "phase"
    t.string "intervention_type"
    t.string "intervention_description"
    t.string "eligibility_criteria"
    t.string "gender"
    t.integer "minimum_age"
    t.string "contact_name"
    t.string "contact_phone"
    t.string "contact_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "email"
    t.string "phone_number"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
