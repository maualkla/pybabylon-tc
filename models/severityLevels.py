class severityLevels:

    _model = ["Low Severity", "Medium Severity", "High Severity", "Critical Severity"]  

    def _secutiryLevel_info(sl):
        return severityLevels._model[sl-1]
    
    def _secutiryLevel_all():
        return severityLevels._model