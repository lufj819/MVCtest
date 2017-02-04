using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MVCtest.Models;
using System.Data.Entity.Core;
using System.Data.Entity.Core.Objects.DataClasses;
using System.Reflection;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;
using System.Data.Entity.Infrastructure;

namespace MVCtest.DBAccess
{
    public class tblJobDB
    {

        /// <summary>
        /// 按照PrimaryKey和EProjectID，获取符合的记录。
        /// </summary>
        /// <param name="job"></param>
        /// <returns></returns>
        public static tblJob SelectJobsByPrimaryKeyEProjectID(tblJob job)
        {
            using (var db = new myDBEntities())
            {
                tblJob j = new tblJob();
                try
                {
                    //lamada表达式，简化匿名函数
                    j = db.tblJob.SingleOrDefault<tblJob>((tblJob t) => t.chrLocalNumber == job.chrLocalNumber && t.chrONLNumber == job.chrONLNumber && t.inteProjectID == job.inteProjectID);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                return j;
            }
        }

        /// <summary>
        /// 按照EProjectID，获得所有符合条件的记录（过滤EprojectID=null）
        /// </summary>
        /// <param name="job"></param>
        /// <returns></returns>
        public static IList<tblJob> SelectJobsByEProjectID(tblJob job)
        {
            IList<tblJob> jobs = null;

            try
            {
                //过滤EProject编号为null的情况            
                if (!string.IsNullOrWhiteSpace(job.inteProjectID))
                {
                    using (var db = new myDBEntities())
                    {
                        jobs = (from j in db.tblJob
                                where j.inteProjectID == job.inteProjectID
                                select j).ToList<tblJob>();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return jobs;
        }

        /// <summary>
        /// 创建job，并保存日志
        /// </summary>
        /// <param name="job"></param>
        /// <returns>0：记录已存在，插入失败</returns>
        public static int CreateJob(tblJob job)
        {
            using (var db = new myDBEntities())
            {
                int createResult = 0;
                tblJob j = SelectJobsByPrimaryKeyEProjectID(job);

                try
                {
                    if (j == null)
                    {
                        db.tblJob.Add(job);
                        createResult = db.SaveChanges();

                        //插入Create日志
                        //synclog log= SyncCreateLog(job);
                        //synclogDB.SyncCreatelog(log);
                        synclog log = new synclog();
                        log.syncid = Guid.NewGuid();
                        log.logon_user = string.Empty;
                        log.chrLocalNumber = job.chrLocalNumber;
                        log.chrONLNumber = job.chrONLNumber;
                        log.eprojectid = job.inteProjectID;
                        log.operation = "Create";
                        log.commit_time = DateTime.Now;
                        log.rowid = job.NumID;
                        log.tablename = "tblJob";
                        log.contents = string.Format("创建记录！（EProject号：{0},项目号：{1},online号：{2}）", log.eprojectid, log.chrLocalNumber, log.chrONLNumber);
                        log.undo_sql = string.Format("delete from {0} where NumID={1}", log.tablename, log.rowid);
                        synclogDB.SyncCreatelog(log);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                return createResult;
            }
        }

        /// <summary>
        /// 使用SQL语句创建job，并保存日志（insert指定值，其他值由数据库默认值填充）
        /// </summary>
        /// <param name="job"></param>
        /// <returns>0：记录已存在，插入失败</returns>
        public static int CreateJobBySQL(tblJob job)
        {
            using (var db = new myDBEntities())
            {
                int createResult = 0;
                tblJob j = SelectJobsByPrimaryKeyEProjectID(job);

                try
                {
                    if (j == null)
                    {
                        //db.tblJob.Add(job);
                        //createResult = db.SaveChanges();
                        //使用SQL语句来insert
                        db.Database.ExecuteSqlCommand(@"insert into tblJob
                                              (chrLocalNumber,
                                               chrONLNumber,
                                               chrName,
                                               chrDivision,
                                               chrCountry,
                                               chrProductType,
                                               chrSampleType,
                                               chrIPG,
                                               chrClient,
                                               blKeyClient
                                               )  
                                            values
                                              ({0},{1},{2},{3},{4},{5},{6},{7},{8},{9})
                                              ",job.chrLocalNumber,job.chrONLNumber,job.chrName,job.chrName,job.chrDivision,job.chrCountry,job.chrProductType,job.chrSampleType,job.chrIPG,job.chrClient,job.blKeyClient);


                        //db.Database.ExecuteSqlCommand(@"INSERT INTO [dbo].[tblJob]
                        //                   (
                        //                    chrLocalNumber,
                        //                    chrONLNumber,
                        //                    chrName,
                        //                    chrDivision,
                        //                    chrCountry,
                        //                    chrProductType,
                        //                    chrSampleType,
                        //                    chrIPG,
                        //                    chrClient,
                        //                    blKeyClient,
                        //                    chrMethodology,
                        //                    blMutltiCountry,
                        //                    chrFrequency,
                        //                    chrFrequencyDetail,
                        //                    chrTrackingFWRange,
                        //                    chrTrackingFWFrequency,
                        //                    chrResearchers,
                        //                    chrResearcherEmail,
                        //                    chrCSTeamHead,
                        //                    chrCSTeamHeadEmail,
                        //                    chrClean,
                        //                    chrTable,
                        //                    chrCoding,
                        //                    dtmFinalQNRExpected,
                        //                    dtmFieldStart,
                        //                    dtmEndFieldSheduled,
                        //                    dtmPPMScheduled,
                        //                    dtmTestLinkScheduled,
                        //                    dtmLiveLinkScheduled,
                        //                    dtmFinalDataScheduled,
                        //                    chrPlatformUsed,
                        //                    dblLOIScheduled,
                        //                    intSampleSizeScheduled,
                        //                    chrFWMethod,
                        //                    chrFWRecordType,
                        //                    chrSLMSstdDemo,
                        //                    blNeedCleaning,
                        //                    blNeedTable,
                        //                    blNeedCoding,
                        //                    dtmFinalQnrtoGO,
                        //                    chrNumOpenEnds,
                        //                    chrNumSemiOpenEnds,
                        //                    chrCodeFrameFormat,
                        //                    chrReferenceCodeFrame,
                        //                    chrReferenceCodeFrameMethod,
                        //                    dtmCodeFrameScheduled,
                        //                    dtmOEdeliveryScheduled,
                        //                    dtmFinalOEtableScheduled,
                        //                    dtmCEDatadeliveryScheduled,
                        //                    intQnrbatches,
                        //                    dtmTableSpecScheduled,
                        //                    chrInterimTable,
                        //                    dtmInterimTableScheduled,
                        //                    dtmFinalCETableScheduled,
                        //                    memGOotherRequests,
                        //                    dtmTBADueDate,
                        //                    blWeighting,
                        //                    blCrosstab,
                        //                    blBPP,
                        //                    blMVA,
                        //                    blEQData,
                        //                    blRSI,
                        //                    blSPSSwithoutLabel,
                        //                    blSPSSwithLabel,
                        //                    blCombineTable,
                        //                    blOthers,
                        //                    inteProjectID,
                        //                    chrWBSNumber,
                        //                    chrQuotationProducer,
                        //                    blNeedCharting,
                        //                    dtmQCFinishExpected,
                        //                    chrLatestBKFMVersion,
                        //                    dtmBKFMPrerecruitmentStarts,
                        //                    chrBKFMIR
		                      //              )
                        //             VALUES
                        //                   (<chrLocalNumber, nvarchar(255),>
                        //                   ,<chrONLNumber, nvarchar(255),>
                        //                   ,<chrName, nvarchar(255),>
                        //                   ,<chrDivision, nvarchar(255),>
                        //                   ,<chrCountry, nvarchar(255),>
                        //                   ,<chrProductType, nvarchar(255),>
                        //                   ,<chrSampleType, nvarchar(255),>
                        //                   ,<chrIPG, nvarchar(255),>
                        //                   ,<chrClient, nvarchar(255),>
                        //                   ,<blKeyClient, bit,>
                        //                   ,<chrStatus, nvarchar(255),>
                        //                   ,<chrMethodology, nvarchar(255),>
                        //                   ,<blMutltiCountry, bit,>
                        //                   ,<chrFrequency, nvarchar(255),>
                        //                   ,<chrFrequencyDetail, ntext,>
                        //                   ,<chrTrackingFWRange, nvarchar(255),>
                        //                   ,<chrTrackingFWFrequency, nvarchar(255),>
                        //                   ,<memPaperQnrBatch, ntext,>
                        //                   ,<chrResearchers, nvarchar(255),>
                        //                   ,<chrResearcherEmail, ntext,>
                        //                   ,<chrCSTeamHead, nvarchar(255),>
                        //                   ,<chrCSTeamHeadEmail, ntext,>
                        //                   ,<chrProgrammer, nvarchar(255),>
                        //                   ,<chrSPC, nvarchar(255),>
                        //                   ,<chrOnshoreSupport, nvarchar(255),>
                        //                   ,<chrSCT, nvarchar(255),>
                        //                   ,<chrFC, nvarchar(255),>
                        //                   ,<chrFCEmail, ntext,>
                        //                   ,<chrQA, nvarchar(255),>
                        //                   ,<chrQAEmail, ntext,>
                        //                   ,<chrDD, nvarchar(255),>
                        //                   ,<chrClean, nvarchar(255),>
                        //                   ,<chrCleanEmail, ntext,>
                        //                   ,<chrCleanPM, nvarchar(255),>
                        //                   ,<chrCleanPMEmail, ntext,>
                        //                   ,<chrTablePM, nvarchar(255),>
                        //                   ,<chrTablePMEmail, ntext,>
                        //                   ,<chrTable, nvarchar(255),>
                        //                   ,<chrTableEmail, ntext,>
                        //                   ,<chrCoding, nvarchar(255),>
                        //                   ,<chrCodingEmail, ntext,>
                        //                   ,<dtmFinalQNRExpected, datetime,>
                        //                   ,<dtmFieldStart, datetime,>
                        //                   ,<dtmEndFieldSheduled, datetime,>
                        //                   ,<dblEstimateSetupTime, float,>
                        //                   ,<intComplexity, int,>
                        //                   ,<intCleanPriority, int,>
                        //                   ,<dtmCreated, datetime,>
                        //                   ,<dtmPPMScheduled, datetime,>
                        //                   ,<dtmTestLinkScheduled, datetime,>
                        //                   ,<dtmLiveLinkScheduled, datetime,>
                        //                   ,<dtmInterimDataScheduled, datetime,>
                        //                   ,<dtmFinalDataScheduled, datetime,>
                        //                   ,<dtmFinalQNRReceived, datetime,>
                        //                   ,<dtmProgrammingStart, datetime,>
                        //                   ,<dtmTestLinkReady, datetime,>
                        //                   ,<dtmLiveLinkReady, datetime,>
                        //                   ,<dtmActualFieldworkStart, datetime,>
                        //                   ,<dtmActualFieldworkEnd, datetime,>
                        //                   ,<dtmInterimDataDeliveryDate, datetime,>
                        //                   ,<dtmClose, datetime,>
                        //                   ,<dtmArchival, datetime,>
                        //                   ,<dblErrorTime, float,>
                        //                   ,<dblChangeTime, float,>
                        //                   ,<dblRealSetupTime, float,>
                        //                   ,<blTestLinkFTR, bit,>
                        //                   ,<blFinalDataFTR, bit,>
                        //                   ,<intEPriorTestLinkCount, int,>
                        //                   ,<intErrorCount, int,>
                        //                   ,<intErrorsCountAfterLiveLink, int,>
                        //                   ,<intCPriorTestLinkCount, int,>
                        //                   ,<intChangesCount, int,>
                        //                   ,<chrLivePID, ntext,>
                        //                   ,<intTotalNumberOfCompletes, int,>
                        //                   ,<dblIndur, float,>
                        //                   ,<blDataIssue, bit,>
                        //                   ,<blFinalDataOnTimeDelivery, bit,>
                        //                   ,<intChangesCountAfterLiveLink, int,>
                        //                   ,<intAgreedScheduleinDays, int,>
                        //                   ,<blFinalQnrtoDAonTime, bit,>
                        //                   ,<blTestlinkonTime, bit,>
                        //                   ,<intErrorsinInitialLink, int,>
                        //                   ,<memMFT, ntext,>
                        //                   ,<intErrorsafterInitialLink, int,>
                        //                   ,<intErrorsMaterials, int,>
                        //                   ,<intErrorsQnr, int,>
                        //                   ,<intChangesMaterials, int,>
                        //                   ,<intChangesQnr, int,>
                        //                   ,<intChangesTotal, int,>
                        //                   ,<intErrorsTotal, int,>
                        //                   ,<dblInitialSetupTime, float,>
                        //                   ,<dblTotalSetupTime, float,>
                        //                   ,<dblTotalChangeTIme, float,>
                        //                   ,<dblTotalProductionTime, float,>
                        //                   ,<intNumChangeAfterLive, int,>
                        //                   ,<dblEstimateSelfSetup, float,>
                        //                   ,<memProjectReview, ntext,>
                        //                   ,<dblChangePriorTestLinkTime, float,>
                        //                   ,<intChangeBatch, int,>
                        //                   ,<blQnrFTR, bit,>
                        //                   ,<blQnrAPRbatch, bit,>
                        //                   ,<blQnrAPRitem, bit,>
                        //                   ,<blQnrAPRBatchItem, bit,>
                        //                   ,<intChangeBatchAfterTestLink, int,>
                        //                   ,<dblStage1, float,>
                        //                   ,<dblStage2, float,>
                        //                   ,<dblStage3, float,>
                        //                   ,<blMeet2daySLA, bit,>
                        //                   ,<blDoubt, bit,>
                        //                   ,<blReviewed, bit,>
                        //                   ,<blArchived, bit,>
                        //                   ,<memNote, ntext,>
                        //                   ,<chrPlatformUsed, nvarchar(255),>
                        //                   ,<chrProjectType, nvarchar(255),>
                        //                   ,<chrProgrammer2nd, nvarchar(255),>
                        //                   ,<dtmInitalDataProvided, datetime,>
                        //                   ,<chrCRFPath, ntext,>
                        //                   ,<chrVendorCode, ntext,>
                        //                   ,<chrVendorCityCode, ntext,>
                        //                   ,<blBigChange, bit,>
                        //                   ,<blSLMSApproval, bit,>
                        //                   ,<dblLOIScheduled, float,>
                        //                   ,<intSampleSizeScheduled, int,>
                        //                   ,<chrFWMethod, nvarchar(255),>
                        //                   ,<chrFWRecordType, nvarchar(255),>
                        //                   ,<chrSLMSstdDemo, nvarchar(255),>
                        //                   ,<blNeedCleaning, bit,>
                        //                   ,<blNeedTable, bit,>
                        //                   ,<blNeedCoding, bit,>
                        //                   ,<dtmFinalQnrtoGO, datetime,>
                        //                   ,<chrNumOpenEnds, nvarchar(255),>
                        //                   ,<chrNumSemiOpenEnds, nvarchar(255),>
                        //                   ,<chrCodeFrameFormat, nvarchar(255),>
                        //                   ,<chrReferenceCodeFrame, nvarchar(255),>
                        //                   ,<chrReferenceCodeFrameMethod, nvarchar(255),>
                        //                   ,<dtmCodeFrameScheduled, datetime,>
                        //                   ,<dtmOEdeliveryScheduled, datetime,>
                        //                   ,<dtmFinalOEtableScheduled, datetime,>
                        //                   ,<dtmCEDatadeliveryScheduled, datetime,>
                        //                   ,<intQnrbatches, int,>
                        //                   ,<dtmTableSpecScheduled, datetime,>
                        //                   ,<chrInterimTable, nvarchar(255),>
                        //                   ,<dtmInterimTableScheduled, datetime,>
                        //                   ,<dtmFinalCETableScheduled, datetime,>
                        //                   ,<memGOotherRequests, ntext,>
                        //                   ,<dtmTBADueDate, datetime,>
                        //                   ,<blWeighting, bit,>
                        //                   ,<blCrosstab, bit,>
                        //                   ,<blBPP, bit,>
                        //                   ,<blMVA, bit,>
                        //                   ,<blEQData, bit,>
                        //                   ,<blRSI, bit,>
                        //                   ,<blSPSSwithoutLabel, bit,>
                        //                   ,<blSPSSwithLabel, bit,>
                        //                   ,<blCombineTable, bit,>
                        //                   ,<blOthers, bit,>
                        //                   ,<dtmCodeFrameActual, datetime,>
                        //                   ,<dtmOEdeliveryActual, datetime,>
                        //                   ,<dtmFinalOEtableActual, datetime,>
                        //                   ,<dtmCEDatadeliveryActual, datetime,>
                        //                   ,<dtmOEDatadeliveryActual, datetime,>
                        //                   ,<dtmTableSpecActual, datetime,>
                        //                   ,<dtmInterimTableActual, datetime,>
                        //                   ,<dtmFinalCETableActual, datetime,>
                        //                   ,<dtmTableStart, datetime,>
                        //                   ,<dtmCleanStart, datetime,>
                        //                   ,<dtmQPSMRStart, datetime,>
                        //                   ,<dtmCodingStart, datetime,>
                        //                   ,<intActualQnrBatches, int,>
                        //                   ,<dtmActual1stQnrDueDate, datetime,>
                        //                   ,<dtmActualLastQnrDueDate, datetime,>
                        //                   ,<dtmActualQnrdatamap, datetime,>
                        //                   ,<dtmActualCleanProgramRdy, datetime,>
                        //                   ,<dtmActualQPSMRProgramRdy, datetime,>
                        //                   ,<dtmActualDAGOHandoff, datetime,>
                        //                   ,<dtmActualDQADelievery, datetime,>
                        //                   ,<dtmActualCleanComplete, datetime,>
                        //                   ,<NumActualTotalVerbatim, int,>
                        //                   ,<chrActualNumOpenEnds, nvarchar(255),>
                        //                   ,<chrActualNumSemiOpenEnds, nvarchar(255),>
                        //                   ,<dtmActualInterimCodeFrame, datetime,>
                        //                   ,<dtmActualInterimCodeFrameCS, datetime,>
                        //                   ,<dtmActualFinalCodeFrame, datetime,>
                        //                   ,<dtmActualFinalCodeFrameCS, datetime,>
                        //                   ,<memTableDelayReason, ntext,>
                        //                   ,<dtmActualTBADate, datetime,>
                        //                   ,<dtmTableScriptComplete, datetime,>
                        //                   ,<dtmTableComplete, datetime,>
                        //                   ,<inteProjectID, nvarchar(50),>)");


                        //插入Create日志
                        //synclog log= SyncCreateLog(job);
                        //synclogDB.SyncCreatelog(log);
                        synclog log = new synclog();
                        log.syncid = Guid.NewGuid();
                        log.logon_user = string.Empty;
                        log.chrLocalNumber = job.chrLocalNumber;
                        log.chrONLNumber = job.chrONLNumber;
                        log.eprojectid = job.inteProjectID;
                        log.operation = "Create";
                        log.commit_time = DateTime.Now;
                        log.rowid = job.NumID;
                        log.tablename = "tblJob";
                        log.contents = string.Format("创建记录！（EProject号：{0},项目号：{1},online号：{2}）", log.eprojectid, log.chrLocalNumber, log.chrONLNumber);
                        log.undo_sql = string.Format("delete from {0} where NumID={1}", log.tablename, log.rowid);
                        synclogDB.SyncCreatelog(log);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                return createResult;
            }
        }


        /// <summary>
        /// 保存并插入多条jobs
        /// </summary>
        /// <param name="jobs"></param>
        /// <returns>0：记录已存在，插入失败</returns>
        public static int CreateJobs(IList<tblJob> jobs)
        {
            using (var db = new myDBEntities())
            {
                int createResult = 0;

                try
                {
                    bool exist = true;
                    foreach (tblJob j in jobs)
                    {
                        if (SelectJobsByPrimaryKeyEProjectID(j) != null)
                        {
                            exist = false;
                            break;
                        }
                    }

                    if (exist)
                    {
                        db.tblJob.AddRange(jobs);
                        createResult = db.SaveChanges();
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

                return createResult;
            }
        }

        /// <summary>
        /// 删除指定job的记录
        /// </summary>
        /// <param name="job"></param>
        /// <returns>0：记录不存在，删除失败</returns>
        public static int DeleteJob(tblJob job)
        {
            using (var db = new myDBEntities())
            {
                int deleteResult = 0;

                try
                {
                    tblJob j = SelectJobsByPrimaryKeyEProjectID(job);
                    if (j != null)
                    {
                        db.tblJob.Attach(job);
                        db.tblJob.Remove(job);
                        deleteResult = db.SaveChanges();
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

                return deleteResult;
            }
        }

        /// <summary>
        /// 按照EProjectID，获取满足条件的记录，批量更新指定字段（不包括主键），并保存日志
        /// </summary>
        /// <param name="job"></param>
        /// <returns>0：记录不存在，更新失败</returns>
        public static int UpdateJobByEProjectID(tblJob job)
        {
            using (var db = new myDBEntities())
            {
                int updateResult = 0;
                IList<tblJob> js = SelectJobsByEProjectID(job);

                try
                {
                    //使用EF，更新非主键的字段
                    if (js != null)
                    {
                        //记录更新非主键字段日志
                        IList<synclog> logs = new List<synclog>();
                        Guid syncid = Guid.NewGuid();

                        foreach (tblJob j in js)
                        {
                            tblJob entry = db.tblJob.Attach(j);




                            //使用反射(Reflection),获得model的属性，并赋值
                            PropertyInfo[] entryprops = entry.GetType().GetProperties();

                            bool NeedTable = false;
                            bool NeedCoding = false;
                            bool NeedClean = false;
                            foreach (PropertyInfo ep in entryprops)
                            {
                                //model的属性名
                                string epname = ep.Name;
                                //model属性名的类型:string,int,...
                                string typename = ep.PropertyType.Name;
                                object original_value = ep.GetValue(entry);
                                //搜索model自定义属性为KeyAttribute的属性，如果是Key，则跳过不update
                                object[] keyflag = ep.GetCustomAttributes(typeof(KeyAttribute), true);

                                //如果strTable，strCoding,strClean不为空，则 blNeedTable = true，blNeedCoding = true，blNeedCleaning = true
                                if (epname.Trim().ToLower().Equals("chrtable") && !string.IsNullOrEmpty(Convert.ToString(original_value)))
                                {
                                    NeedTable = true;
                                }
                                if (epname.Trim().ToLower().Equals("chrcoding") && !string.IsNullOrEmpty(Convert.ToString(original_value)))
                                {
                                    NeedCoding = true;
                                }
                                if (epname.Trim().ToLower().Equals("chrclean") && !string.IsNullOrEmpty(Convert.ToString(original_value)))
                                {
                                    NeedClean = true;
                                }


                                if (keyflag.Length == 0)
                                {
                                    if (epname != "NumID" && epname != "inteProjectID")
                                    {
                                        PropertyInfo[] jobprops = job.GetType().GetProperties();
                                        foreach (PropertyInfo jp in jobprops)
                                        {
                                            //找到对应的属性
                                            if (epname.Equals(jp.Name))
                                            {
                                                //object original_value = ep.GetValue(entry);
                                                object current_value = jp.GetValue(job);

                                                //例外：当如果strTable，strCoding,strClean不为空，则 blNeedTable = true，blNeedCoding = true，blNeedCleaning = true
                                                if (epname.Trim().ToLower().Equals("blneedtable") && NeedTable)
                                                {
                                                    current_value = true;
                                                }
                                                if (epname.Trim().ToLower().Equals("blneedcoding") && NeedCoding)
                                                {
                                                    current_value = true;
                                                }
                                                if (epname.Trim().ToLower().Equals("blneedcleaning") && NeedClean)
                                                {
                                                    current_value = true;
                                                }

                                                //更新记录标记 
                                                //条件：(1)eproject值与workbench值不相同  (2)eproject值不为null和不为datetime.minvalue
                                                bool flag = false;
                                                //(1)
                                                if (!Convert.ToString(original_value).Equals(Convert.ToString(current_value)))   //Convert.ToString(null).equals()可以防止报NullReferenceException
                                                {
                                                    //(2)
                                                    if (!string.IsNullOrEmpty(Convert.ToString(current_value)))
                                                    {
                                                        if (!Convert.ToString(current_value).Equals(DateTime.MinValue.ToString()))
                                                        {
                                                            flag = true;
                                                        }
                                                    }
                                                }


                                                if (flag)
                                                {
                                                    ep.SetValue(entry, current_value);

                                                    #region 写入日志表synclog
                                                    //synclog log = SyncUpdateLog(j, syncid, epname, original_value, current_value);
                                                    //logs.Add(log);
                                                    synclog log = new synclog();
                                                    log.syncid = syncid;
                                                    log.logon_user = string.Empty;
                                                    log.chrLocalNumber = j.chrLocalNumber;
                                                    log.chrONLNumber = j.chrONLNumber;
                                                    log.eprojectid = j.inteProjectID;
                                                    log.operation = "Update";
                                                    log.commit_time = DateTime.Now;
                                                    log.rowid = j.NumID;
                                                    log.tablename = "tblJob";
                                                    log.column_name = epname;
                                                    log.original_value = original_value != null ? original_value.ToString() : null;  //过滤NullReferenceException异常
                                                    log.current_value = current_value != null ? current_value.ToString() : null;     //过滤NullReferenceException异常
                                                    log.contents = string.Format("更新记录！字段[{0}]从'{1}'改为'{2}'（EProject号：{3},项目号：{4},online号：{5}）", log.column_name, log.original_value, log.current_value, log.eprojectid, log.chrLocalNumber, log.chrONLNumber);
                                                    if (string.IsNullOrEmpty(log.original_value))
                                                    {
                                                        log.undo_sql = string.Format("update {0} set {1}=null where NumID={2}", log.tablename, log.column_name, log.rowid);
                                                    }
                                                    else
                                                    {
                                                        log.undo_sql = string.Format("update {0} set {1}='{2}' where NumID={3}", log.tablename, log.column_name, log.original_value, log.rowid);
                                                    }
                                                    logs.Add(log);
                                                    #endregion

                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        updateResult = db.SaveChanges();
                        synclogDB.SyncUpdatelog(logs);

                        //使用sql语句更新主键，违反主键约束则不更新
                        IList<synclog> primarylogs = new List<synclog>();
                        bool isUpdatePrimary = true;
                        foreach (tblJob j in js)
                        {
                            //string original_chrONLNumber_value = j.chrONLNumber;
                            string original_chrLocalNumber_value = j.chrLocalNumber;
                            string current_chrLocalNumber_value = job.chrLocalNumber;

                            synclog log = new synclog();
                            log.syncid = syncid;
                            log.logon_user = string.Empty;
                            log.chrLocalNumber = j.chrLocalNumber;
                            log.chrONLNumber = j.chrONLNumber;
                            log.eprojectid = j.inteProjectID;
                            log.operation = "Update";
                            log.commit_time = DateTime.Now;
                            log.rowid = j.NumID;
                            log.tablename = "tblJob";
                            log.column_name = "chrLocalNumber";
                            log.original_value = original_chrLocalNumber_value != null ? original_chrLocalNumber_value.ToString() : null;  //过滤NullReferenceException异常
                            log.current_value = current_chrLocalNumber_value != null ? current_chrLocalNumber_value.ToString() : null;     //过滤NullReferenceException异常



                            string sql = @"select count(NumID) from tblJob where chrLocalNumber={0}";
                            DbRawSqlQuery<int> result = db.Database.SqlQuery<int>(sql, current_chrLocalNumber_value);
                            if (!result.FirstOrDefault().Equals(0))
                            {
                                isUpdatePrimary = false;
                                if (!Convert.ToString(original_chrLocalNumber_value).Equals(Convert.ToString(current_chrLocalNumber_value)))
                                {
                                    log.contents = string.Format("更新chrLocalNumber失败！存在重复值！（EProject号：{0},项目号：{1},online号：{2}）", log.eprojectid, log.chrLocalNumber, log.chrONLNumber);
                                }
                                else
                                {
                                    log.contents = string.Format("未更改chrLocalNumber值！无需更新！（EProject号：{0},项目号：{1},online号：{2}）", log.eprojectid, log.chrLocalNumber, log.chrONLNumber);
                                }
                            }
                            else
                            {
                                log.contents = string.Format("更新记录！字段[{0}]从'{1}'改为'{2}'（EProject号：{3},项目号：{4},online号：{5}）", log.column_name, log.original_value, log.current_value, log.eprojectid, log.chrLocalNumber, log.chrONLNumber);
                                if (string.IsNullOrEmpty(log.original_value))
                                {
                                    log.undo_sql = string.Format("update {0} set {1}=null where NumID={2}", log.tablename, log.column_name, log.rowid);
                                }
                                else
                                {
                                    log.undo_sql = string.Format("update {0} set {1}='{2}' where NumID={3}", log.tablename, log.column_name, log.original_value, log.rowid);
                                }
                            }

                            primarylogs.Add(log);
                        }

                        //联合主键不重复，允许更新primary key
                        if (isUpdatePrimary)
                        {
                            if (!string.IsNullOrWhiteSpace(job.inteProjectID))
                            {
                                db.Database.ExecuteSqlCommand(@"update tblJob set chrLocalNumber={0} where inteProjectID={1}", job.chrLocalNumber, job.inteProjectID);

                            }
                        }
                        synclogDB.SyncUpdatelog(primarylogs);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                return updateResult;
            }
        }


        //private static synclog SyncCreateLog(tblJob job)
        //{
        //    synclog log = new synclog();
        //    log.syncid = Guid.NewGuid();
        //    log.logon_user = string.Empty;
        //    log.chrLocalNumber = job.chrLocalNumber;
        //    log.chrONLNumber = job.chrONLNumber;
        //    log.eprojectid = job.inteProjectID;
        //    log.operation = "Create";
        //    log.commit_time = DateTime.Now;
        //    log.rowid = job.NumID;
        //    log.tablename = "tblJob";
        //    log.contents = string.Format("创建记录！（EProject号：{0},项目号：{1},online号：{2}）", log.eprojectid, log.chrLocalNumber, log.chrONLNumber);
        //    log.undo_sql = string.Format("delete from {0} where NumID={1}", log.tablename, log.rowid);

        //    return log;
        //}

        //private static synclog SyncUpdateLog(tblJob j, Guid syncid, string columnname, object original_value, object current_value)
        //{
        //    synclog log = new synclog();
        //    log.syncid = syncid;
        //    log.logon_user = string.Empty;
        //    log.chrLocalNumber = j.chrLocalNumber;
        //    log.chrONLNumber = j.chrONLNumber;
        //    log.eprojectid = j.inteProjectID;
        //    log.operation = "Update";
        //    log.commit_time = DateTime.Now;
        //    log.rowid = j.NumID;
        //    log.tablename = "tblJob";
        //    log.column_name = columnname;
        //    log.original_value = original_value != null ? original_value.ToString() : null;  //过滤NullReferenceException异常
        //    log.current_value = current_value != null ? current_value.ToString() : null;     //过滤NullReferenceException异常
        //    log.contents = string.Format("更新记录！字段[{0}]从'{1}'改为'{2}'（EProject号：{3},项目号：{4},online号：{5}）", log.column_name, log.original_value, log.current_value, log.eprojectid, log.chrLocalNumber, log.chrONLNumber);
        //    if (string.IsNullOrEmpty(log.original_value))
        //    {
        //        log.undo_sql = string.Format("update {0} set {1}=null where NumID={2}", log.tablename, log.column_name, log.rowid);
        //    }
        //    else
        //    {
        //        log.undo_sql = string.Format("update {0} set {1}='{2}' where NumID={3}", log.tablename, log.column_name, log.original_value, log.rowid);
        //    }
        //    return log;
        //}

        //enum OperateType
        //{
        //    Create=1,
        //    UpdateNotPrimary,
        //    UpdatePrimary
        //}

        /// <summary>
        /// update指定job的自定义字段
        /// </summary>
        /// <param name="job"></param>
        /// <returns>0：记录不存在，更新失败</returns>
        public static int UpdateJobByCustom(tblJob job)
        {
            using (var db = new myDBEntities())
            {
                int updateResult = 0;
                tblJob j = SelectJobsByPrimaryKeyEProjectID(job);

                try
                {
                    if (j != null)
                    {
                        var entry = db.Entry(job);

                        entry.State = System.Data.Entity.EntityState.Unchanged;
                        entry.Property("chrName").IsModified = true;
                        updateResult = db.SaveChanges();
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

                return updateResult;
            }
        }

    }
}