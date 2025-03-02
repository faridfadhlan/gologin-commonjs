export namespace zeroProfilePreferences {
    namespace NewTabPage {
        let PrevNavigationTime: string;
    }
    let account_id_migration_state: number;
    let account_tracker_service_last_update: string;
    let ack_existing_ntp_extensions: boolean;
    namespace alternate_error_pages {
        let backup: boolean;
    }
    let apps: {};
    namespace autocomplete {
        let retention_policy_last_version: number;
    }
    namespace autofill {
        let orphan_rows_removed: boolean;
    }
    namespace bookmark_bar {
        let show_on_all_tabs: boolean;
    }
    namespace browser {
        let has_seen_welcome_page: boolean;
        namespace window_placement {
            let bottom: number;
            let left: number;
            let maximized: boolean;
            let right: number;
            let top: number;
            let work_area_bottom: number;
            let work_area_left: number;
            let work_area_right: number;
            let work_area_top: number;
        }
    }
    let countryid_at_install: number;
    namespace custom_links {
        let initialized: boolean;
        let list: {
            isMostVisited: boolean;
            title: string;
            url: string;
        }[];
    }
    let default_apps_install_state: number;
    namespace domain_diversity {
        let last_reporting_timestamp: string;
    }
    namespace extensions {
        namespace alerts {
            let initialized_1: boolean;
            export { initialized_1 as initialized };
        }
        let chrome_url_overrides: {};
        let last_chrome_version: string;
        let settings: {};
    }
    namespace gaia_cookie {
        let changed_time: number;
        let hash: string;
        let last_list_accounts_data: string;
    }
    namespace gcm {
        let product_category_for_subtypes: string;
    }
    namespace google {
        namespace services {
            let signin_scoped_device_id: string;
        }
    }
    namespace intl {
        let selected_languages: string;
    }
    namespace invalidation {
        let per_sender_topics_to_handler: {
            '1013309121859': {};
            '8181035976': {};
        };
    }
    namespace media {
        let device_id_salt: string;
        namespace engagement {
            let schema_version: number;
        }
    }
    namespace media_router {
        let receiver_id_hash_token: string;
    }
    namespace ntp {
        let num_personal_suggestions: number;
    }
    namespace optimization_guide {
        namespace previously_registered_optimization_types {
            let ABOUT_THIS_SITE: boolean;
            let HISTORY_CLUSTERS: boolean;
        }
        let store_file_paths_to_delete: {};
    }
    namespace plugins {
        let plugins_list: any[];
    }
    namespace privacy_sandbox {
        let preferences_reconciled: boolean;
    }
    namespace profile {
        let avatar_bubble_tutorial_shown: number;
        let avatar_index: number;
        namespace content_settings {
            namespace enable_quiet_permission_ui_enabling_method {
                let notifications: number;
            }
            namespace exceptions {
                export let accessibility_events: {};
                export let app_banner: {};
                export let ar: {};
                export let auto_select_certificate: {};
                export let automatic_downloads: {};
                export let autoplay: {};
                export let background_sync: {};
                export let bluetooth_chooser_data: {};
                export let bluetooth_guard: {};
                export let bluetooth_scanning: {};
                export let camera_pan_tilt_zoom: {};
                export let client_hints: {};
                export let clipboard: {};
                export let cookies: {};
                export let durable_storage: {};
                export let fedcm_active_session: {};
                export let fedcm_share: {};
                export let file_system_access_chooser_data: {};
                export let file_system_last_picked_directory: {};
                export let file_system_read_guard: {};
                export let file_system_write_guard: {};
                export let formfill_metadata: {};
                export let geolocation: {};
                export let get_display_media_set_select_all_screens: {};
                export let hid_chooser_data: {};
                export let hid_guard: {};
                export let http_allowed: {};
                export let idle_detection: {};
                export let images: {};
                export let important_site_info: {};
                export let insecure_private_network: {};
                export let installed_web_app_metadata: {};
                export let intent_picker_auto_display: {};
                export let javascript: {};
                export let javascript_jit: {};
                export let legacy_cookie_access: {};
                export let local_fonts: {};
                export let media_engagement: {};
                export let media_stream_camera: {};
                export let media_stream_mic: {};
                export let midi_sysex: {};
                export let mixed_script: {};
                export let nfc_devices: {};
                let notifications_1: {};
                export { notifications_1 as notifications };
                export let password_protection: {};
                export let payment_handler: {};
                export let permission_autoblocking_data: {};
                export let permission_autorevocation_data: {};
                export let popups: {};
                export let ppapi_broker: {};
                export let protocol_handler: {};
                export let safe_browsing_url_check_data: {};
                export let sensors: {};
                export let serial_chooser_data: {};
                export let serial_guard: {};
                export let site_engagement: {};
                export let sound: {};
                export let ssl_cert_decisions: {};
                export let storage_access: {};
                export let subresource_filter: {};
                export let subresource_filter_data: {};
                export let usb_chooser_data: {};
                export let usb_guard: {};
                export let vr: {};
                export let webid_api: {};
                let window_placement_1: {};
                export { window_placement_1 as window_placement };
            }
            let pref_version: number;
        }
        let created_by_version: string;
        let creation_time: string;
        let exit_type: string;
        let last_engagement_time: string;
        let last_time_password_store_metrics_reported: number;
        let managed_user_id: string;
        let name: string;
        let password_account_storage_settings: {};
    }
    namespace safebrowsing {
        let event_timestamps: {};
        let metrics_last_log_time: string;
    }
    namespace signin {
        let allowed: boolean;
    }
    namespace sync {
        let requested: boolean;
    }
    let translate_site_blacklist: any[];
    let translate_site_blacklist_with_time: {};
    namespace unified_consent {
        let migration_state: number;
    }
    namespace web_apps {
        let system_web_app_failure_count: number;
        let system_web_app_last_attempted_language: string;
        let system_web_app_last_attempted_update: string;
        let system_web_app_last_installed_language: string;
        let system_web_app_last_update: string;
    }
    namespace webauthn {
        namespace touchid {
            let metadata_secret: string;
        }
    }
}
