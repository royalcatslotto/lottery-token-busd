# Wallet addresses to be test called from frontend.
- _operator: 0xad1F66Acea98733D63cd8FC522118e4014Cb3F79
- _user: 0x3A1A10A76F34520adF30a30Ef5a6df1B055DA614
- _referrer: 0xa0f485BC8FDbF910637ce43Ba851e08C25c7Cb84

# Description
- Only operator smartcontract can record referrals and referral commisions.
- _user is the user who are referred by _referrer
- referralsCount function is called from frontend (return int)
- totalReferralCommissions is called from frontend (return uint256)
- claim button will display (visible) from frontend if totalReferralCommissions > 0  
- claimCommission is called from frontend 
- after claimCommission transaction is completed, call totalReferralCommissions function again. It should only return 0
- after claimCommission transaction is completed, claim button should disappear;