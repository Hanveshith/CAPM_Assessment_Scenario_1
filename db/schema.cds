namespace ust.HanveshithReddy.Juvventhula.DB;

using { cuid, Currency } from '@sap/cds/common';

using { ust.HanveshithReddy.Juvventhula.resue as resuetypes } from './common';

// extend Currencies {
//     salaryAmount: Decimal(10,2);
//     accountNumber: String(16);
//     bankId: String(8);
//     bankName: String(64)
// };

define entity Employee : cuid {
    nameFirst : String(40);
    nameMiddle : String(40);
    nameLast : String(40);
    nameInitials : String(40);
    Gender : resuetypes.gender;
    Language : String(2);                // Mentioned required length as 1.
    phoneNumber : resuetypes.phonenumber;
    Email : resuetypes.email;
    loginName : String(12);
    Currency : Currency;
    salaryAmount: Decimal(10,2);
    accountNumber: String(16);
    bankId: String(8);
    bankName: String(64)
}
