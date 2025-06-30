import { PDFDownloadLink } from '@react-pdf/renderer';

const ReportTemplate = ({ students }) => (
  <Document>
    <Page>
      <Text>TTU Attendance Report</Text>
      {students.map(student => (
        <Text key={student.id}>
          {student.name}: {student.attendance}%
        </Text>
      ))}
    </Page>
  </Document>
);

export function ReportButton() {
  const { students } = useContext(AppContext);
  
  return (
    <PDFDownloadLink 
      document={<ReportTemplate students={students} />}
      fileName="attendance_report.pdf"
    >
      {({ loading }) => (
        <button disabled={loading}>
          {loading ? 'Generating...' : 'Export PDF'}
        </button>
      )}
    </PDFDownloadLink>
  );
}