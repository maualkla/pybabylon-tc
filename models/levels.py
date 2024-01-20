class levels:
    _models = [
        ["NRU", "Not Registered User", "Public user"],
        ["DRU", "Dependent Registered User", "Workspace User"],
        ["AMRU", "Account Manager Registered User", "Adminde Workspace Owner"], 
        ["MU", "Moderator User", "Moderator User Assigned by the Account Manager"], 
        ["DU", "Developer User", "User with development rignts, Super User assing it."], 
        ["SU", "Super User", "Super User who adminstrates the system"]
    ]

    def _type_info(type):
        match type:
            case 0:
                return levels._models[0]
            case 1:
                return levels._models[1]
            case 2:
                return levels._models[2]
            case 3:
                return levels._models[3]
            case 4:
                return levels._models[4]
            case 5:
                return levels._models[5]
            case _:
                return False
