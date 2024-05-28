type PayoutHistory = {date_added: string, amount: string, status: {name: string}, type: string}[];

export default interface AffiliatePortal {
    referral_code: string;
    is_expired: boolean;
    total_referrals: number;
    total_commission: string;
    completed_payout: string;
    referral_code_commission_percentage: string;
    payout_history: PayoutHistory;
    pending_payout: string;
    withdrawable_amount: string;
};
