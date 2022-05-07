interface Entitlement {
	expires_date: string;
	purchase_date: string;
	product_identifier: string;
}

type Store = 'app_store' | 'mac_app_store' | 'play_store' | 'amazon' | 'stripe' | 'promotional';

interface Subscription {
	expires_date: string;
	purchase_date: string;
	original_purchase_date: string;
	ownership_type: 'PURCHASED' | 'FAMILY_SHARED';
	period_type: 'normal' | 'trial' | 'intro';
	store: Store;
	is_sandbox: boolean;
	unsubscribe_detected_at: string;
	billing_issues_detected_at: string;
}

interface NonSubscription {
	id: string;
	purchase_date: string;
	store: Store;
	is_sandbox: boolean;
}

export interface RevenueCatApiResponse {
	request_date: string;
	request_date_ms: string;
	subscriber: {
		original_app_user_id: string;
		original_application_version: string;
		first_seen: string;
		last_seen: string;
		entitlements: Record<string, Entitlement>;
		subscriptions: Record<string, Subscription>;
		non_subscriptions: Record<string, NonSubscription>;
		subscriber_attributes: Record<string, { value: string; updated_at_ms: string }>;
	};
}
