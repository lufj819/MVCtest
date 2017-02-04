//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace MVCtest.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class tblJob
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        //public tblJob()
        //{
        //    this.blTestLinkFTR = true;
        //}
    
        public int NumID { get; set; }
        [Key]
        public string chrLocalNumber { get; set; }
        [Key]
        public string chrONLNumber { get; set; }
        public string chrName { get; set; }
        public string chrDivision { get; set; }
        public string chrCountry { get; set; }
        public string chrProductType { get; set; }
        public string chrSampleType { get; set; }
        public string chrIPG { get; set; }
        public string chrClient { get; set; }
        public bool blKeyClient { get; set; }
        public string chrStatus { get; set; }
        public string chrMethodology { get; set; }
        public bool blMutltiCountry { get; set; }
        public string chrFrequency { get; set; }
        public string chrFrequencyDetail { get; set; }
        public string chrTrackingFWRange { get; set; }
        public string chrTrackingFWFrequency { get; set; }
        public string memPaperQnrBatch { get; set; }
        public string chrResearchers { get; set; }
        public string chrResearcherEmail { get; set; }
        public string chrCSTeamHead { get; set; }
        public string chrCSTeamHeadEmail { get; set; }
        public string chrProgrammer { get; set; }
        public string chrSPC { get; set; }
        public string chrOnshoreSupport { get; set; }
        public string chrSCT { get; set; }
        public string chrFC { get; set; }
        public string chrFCEmail { get; set; }
        public string chrQA { get; set; }
        public string chrQAEmail { get; set; }
        public string chrDD { get; set; }
        public string chrClean { get; set; }
        public string chrCleanEmail { get; set; }
        public string chrCleanPM { get; set; }
        public string chrCleanPMEmail { get; set; }
        public string chrTablePM { get; set; }
        public string chrTablePMEmail { get; set; }
        public string chrTable { get; set; }
        public string chrTableEmail { get; set; }
        public string chrCoding { get; set; }
        public string chrCodingEmail { get; set; }
        public Nullable<System.DateTime> dtmFinalQNRExpected { get; set; }
        public Nullable<System.DateTime> dtmFieldStart { get; set; }
        public Nullable<System.DateTime> dtmEndFieldSheduled { get; set; }
        public Nullable<double> dblEstimateSetupTime { get; set; }
        public Nullable<int> intComplexity { get; set; }
        public Nullable<int> intCleanPriority { get; set; }
        public Nullable<System.DateTime> dtmCreated { get; set; }
        public Nullable<System.DateTime> dtmPPMScheduled { get; set; }
        public Nullable<System.DateTime> dtmTestLinkScheduled { get; set; }
        public Nullable<System.DateTime> dtmLiveLinkScheduled { get; set; }
        public Nullable<System.DateTime> dtmInterimDataScheduled { get; set; }
        public Nullable<System.DateTime> dtmFinalDataScheduled { get; set; }
        public Nullable<System.DateTime> dtmFinalQNRReceived { get; set; }
        public Nullable<System.DateTime> dtmProgrammingStart { get; set; }
        public Nullable<System.DateTime> dtmTestLinkReady { get; set; }
        public Nullable<System.DateTime> dtmLiveLinkReady { get; set; }
        public Nullable<System.DateTime> dtmActualFieldworkStart { get; set; }
        public Nullable<System.DateTime> dtmActualFieldworkEnd { get; set; }
        public Nullable<System.DateTime> dtmInterimDataDeliveryDate { get; set; }
        public Nullable<System.DateTime> dtmClose { get; set; }
        public Nullable<System.DateTime> dtmArchival { get; set; }
        public Nullable<double> dblErrorTime { get; set; }
        public Nullable<double> dblChangeTime { get; set; }
        public Nullable<double> dblRealSetupTime { get; set; }
        [NotMapped]
        public bool blTestLinkFTR { get; set; }
        public bool blFinalDataFTR { get; set; }
        public Nullable<int> intEPriorTestLinkCount { get; set; }
        public Nullable<int> intErrorCount { get; set; }
        public Nullable<int> intErrorsCountAfterLiveLink { get; set; }
        public Nullable<int> intCPriorTestLinkCount { get; set; }
        public Nullable<int> intChangesCount { get; set; }
        public string chrLivePID { get; set; }
        public Nullable<int> intTotalNumberOfCompletes { get; set; }
        public Nullable<double> dblIndur { get; set; }
        public bool blDataIssue { get; set; }
        public bool blFinalDataOnTimeDelivery { get; set; }
        public Nullable<int> intChangesCountAfterLiveLink { get; set; }
        public Nullable<int> intAgreedScheduleinDays { get; set; }
        public bool blFinalQnrtoDAonTime { get; set; }
        public bool blTestlinkonTime { get; set; }
        public Nullable<int> intErrorsinInitialLink { get; set; }
        public string memMFT { get; set; }
        public Nullable<int> intErrorsafterInitialLink { get; set; }
        public Nullable<int> intErrorsMaterials { get; set; }
        public Nullable<int> intErrorsQnr { get; set; }
        public Nullable<int> intChangesMaterials { get; set; }
        public Nullable<int> intChangesQnr { get; set; }
        public Nullable<int> intChangesTotal { get; set; }
        public Nullable<int> intErrorsTotal { get; set; }
        public Nullable<double> dblInitialSetupTime { get; set; }
        public Nullable<double> dblTotalSetupTime { get; set; }
        public Nullable<double> dblTotalChangeTIme { get; set; }
        public Nullable<double> dblTotalProductionTime { get; set; }
        public Nullable<int> intNumChangeAfterLive { get; set; }
        public Nullable<double> dblEstimateSelfSetup { get; set; }
        public string memProjectReview { get; set; }
        public Nullable<double> dblChangePriorTestLinkTime { get; set; }
        public Nullable<int> intChangeBatch { get; set; }
        public bool blQnrFTR { get; set; }
        public bool blQnrAPRbatch { get; set; }
        public bool blQnrAPRitem { get; set; }
        public bool blQnrAPRBatchItem { get; set; }
        public Nullable<int> intChangeBatchAfterTestLink { get; set; }
        public Nullable<double> dblStage1 { get; set; }
        public Nullable<double> dblStage2 { get; set; }
        public Nullable<double> dblStage3 { get; set; }
        public bool blMeet2daySLA { get; set; }
        public bool blDoubt { get; set; }
        public bool blReviewed { get; set; }
        public bool blArchived { get; set; }
        public string memNote { get; set; }
        public string chrPlatformUsed { get; set; }
        public string chrProjectType { get; set; }
        public string chrProgrammer2nd { get; set; }
        public Nullable<System.DateTime> dtmInitalDataProvided { get; set; }
        public string chrCRFPath { get; set; }
        public string chrVendorCode { get; set; }
        public string chrVendorCityCode { get; set; }
        public bool blBigChange { get; set; }
        public bool blSLMSApproval { get; set; }
        public Nullable<double> dblLOIScheduled { get; set; }
        public Nullable<int> intSampleSizeScheduled { get; set; }
        public string chrFWMethod { get; set; }
        public string chrFWRecordType { get; set; }
        public string chrSLMSstdDemo { get; set; }
        public bool blNeedCleaning { get; set; }
        public bool blNeedTable { get; set; }
        public bool blNeedCoding { get; set; }
        public Nullable<System.DateTime> dtmFinalQnrtoGO { get; set; }
        public string chrNumOpenEnds { get; set; }
        public string chrNumSemiOpenEnds { get; set; }
        public string chrCodeFrameFormat { get; set; }
        public string chrReferenceCodeFrame { get; set; }
        public string chrReferenceCodeFrameMethod { get; set; }
        public Nullable<System.DateTime> dtmCodeFrameScheduled { get; set; }
        public Nullable<System.DateTime> dtmOEdeliveryScheduled { get; set; }
        public Nullable<System.DateTime> dtmFinalOEtableScheduled { get; set; }
        public Nullable<System.DateTime> dtmCEDatadeliveryScheduled { get; set; }
        public Nullable<int> intQnrbatches { get; set; }
        public Nullable<System.DateTime> dtmTableSpecScheduled { get; set; }
        public string chrInterimTable { get; set; }
        public Nullable<System.DateTime> dtmInterimTableScheduled { get; set; }
        public Nullable<System.DateTime> dtmFinalCETableScheduled { get; set; }
        public string memGOotherRequests { get; set; }
        public Nullable<System.DateTime> dtmTBADueDate { get; set; }
        public bool blWeighting { get; set; }
        public bool blCrosstab { get; set; }
        public bool blBPP { get; set; }
        public bool blMVA { get; set; }
        public bool blEQData { get; set; }
        public bool blRSI { get; set; }
        public bool blSPSSwithoutLabel { get; set; }
        public bool blSPSSwithLabel { get; set; }
        public bool blCombineTable { get; set; }
        public bool blOthers { get; set; }
        public Nullable<System.DateTime> dtmCodeFrameActual { get; set; }
        public Nullable<System.DateTime> dtmOEdeliveryActual { get; set; }
        public Nullable<System.DateTime> dtmFinalOEtableActual { get; set; }
        public Nullable<System.DateTime> dtmCEDatadeliveryActual { get; set; }
        public Nullable<System.DateTime> dtmOEDatadeliveryActual { get; set; }
        public Nullable<System.DateTime> dtmTableSpecActual { get; set; }
        public Nullable<System.DateTime> dtmInterimTableActual { get; set; }
        public Nullable<System.DateTime> dtmFinalCETableActual { get; set; }
        public Nullable<System.DateTime> dtmTableStart { get; set; }
        public Nullable<System.DateTime> dtmCleanStart { get; set; }
        public Nullable<System.DateTime> dtmQPSMRStart { get; set; }
        public Nullable<System.DateTime> dtmCodingStart { get; set; }
        public Nullable<int> intActualQnrBatches { get; set; }
        public Nullable<System.DateTime> dtmActual1stQnrDueDate { get; set; }
        public Nullable<System.DateTime> dtmActualLastQnrDueDate { get; set; }
        public Nullable<System.DateTime> dtmActualQnrdatamap { get; set; }
        public Nullable<System.DateTime> dtmActualCleanProgramRdy { get; set; }
        public Nullable<System.DateTime> dtmActualQPSMRProgramRdy { get; set; }
        public Nullable<System.DateTime> dtmActualDAGOHandoff { get; set; }
        public Nullable<System.DateTime> dtmActualDQADelievery { get; set; }
        public Nullable<System.DateTime> dtmActualCleanComplete { get; set; }
        public Nullable<int> NumActualTotalVerbatim { get; set; }
        public string chrActualNumOpenEnds { get; set; }
        public string chrActualNumSemiOpenEnds { get; set; }
        public Nullable<System.DateTime> dtmActualInterimCodeFrame { get; set; }
        public Nullable<System.DateTime> dtmActualInterimCodeFrameCS { get; set; }
        public Nullable<System.DateTime> dtmActualFinalCodeFrame { get; set; }
        public Nullable<System.DateTime> dtmActualFinalCodeFrameCS { get; set; }
        public string memTableDelayReason { get; set; }
        public Nullable<System.DateTime> dtmActualTBADate { get; set; }
        public Nullable<System.DateTime> dtmTableScriptComplete { get; set; }
        public Nullable<System.DateTime> dtmTableComplete { get; set; }
        public string inteProjectID { get; set; }
    }
}
