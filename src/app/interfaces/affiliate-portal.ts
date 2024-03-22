export default interface AffiliatePortal {
    referral_code: string;
    is_expired: boolean;
    total_referrals: number;
    total_commission: string;
    completed_payout: string;
    referral_code_commission_percentage: string;
    payout_history: {date: string, amount: string, status: number, type: string}[];
    pending_payout: string;
    withdrawable_amount: string;
}