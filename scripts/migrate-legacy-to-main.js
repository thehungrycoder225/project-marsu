// migrate-legacy-to-main.js
// Node.js script to migrate unique data from legacy Resources.json to main Resources.json

const fs = require('fs');
const path = require('path');

const legacyPath = path.join(__dirname, '../public/Resources.json');
const mainPath = path.join(
  __dirname,
  '../public/data/marsu-resources/Resources.json'
);

const legacy = JSON.parse(fs.readFileSync(legacyPath, 'utf-8'));
const main = JSON.parse(fs.readFileSync(mainPath, 'utf-8'));

function getCollegeIdByKey(collegeKey) {
  const college = main.colleges.find(
    (c) =>
      c.shortName &&
      (c.shortName.en === collegeKey || c.shortName === collegeKey)
  );
  return college ? college.id : null;
}

function migrateArray(legacyArr, mainArr, key = 'id') {
  const mainIds = new Set(mainArr.map((item) => item[key]));
  legacyArr.forEach((item) => {
    if (!mainIds.has(item[key])) {
      mainArr.push(item);
    }
  });
}

// 1. Faculty/Workforce
if (legacy.workForce) {
  legacy.workForce.forEach((wf) => {
    const collegeId = getCollegeIdByKey(wf.collegeKey);
    if (wf.faculty) {
      wf.faculty.forEach((faculty) => {
        if (collegeId) faculty.collegeId = collegeId;
        if (
          !main.faculty.some(
            (f) => f.id === faculty.id && f.collegeId === collegeId
          )
        ) {
          main.faculty.push(faculty);
        }
      });
    }
    if (wf.staff) {
      wf.staff.forEach((staff) => {
        if (collegeId) staff.collegeId = collegeId;
        if (
          !main.staff.some(
            (s) => s.id === staff.id && s.collegeId === collegeId
          )
        ) {
          main.staff.push(staff);
        }
      });
    }
  });
}

// 2. Research & Extension
if (legacy.research) {
  legacy.research.forEach((r) => {
    const collegeId = getCollegeIdByKey(r.collegeKey);
    if (r.research) {
      r.research.forEach((re) => {
        if (collegeId) re.collegeId = collegeId;
        if (
          !main.research.some(
            (mr) => mr.id === re.id && mr.collegeId === collegeId
          )
        ) {
          main.research.push(re);
        }
      });
    }
    if (r.extension) {
      r.extension.forEach((ext) => {
        if (collegeId) ext.collegeId = collegeId;
        if (
          !main.extensions.some(
            (me) => me.id === ext.id && me.collegeId === collegeId
          )
        ) {
          main.extensions.push(ext);
        }
      });
    }
  });
}

// 3. Student Achievements, Profiles, Publications
if (legacy.studentAchievement) {
  legacy.studentAchievement.forEach((sa) => {
    const collegeId = getCollegeIdByKey(sa.collegeKey);
    if (collegeId) sa.collegeId = collegeId;
    if (
      !main.studentAchievements.some(
        (msa) => msa.id === sa.id && msa.collegeId === collegeId
      )
    ) {
      main.studentAchievements.push(sa);
    }
  });
}
if (legacy.studentProfile) {
  legacy.studentProfile.forEach((sp) => {
    const collegeId = getCollegeIdByKey(sp.collegeKey);
    if (collegeId) sp.collegeId = collegeId;
    if (
      !main.studentProfiles.some(
        (msp) => msp.id === sp.id && msp.collegeId === collegeId
      )
    ) {
      main.studentProfiles.push(sp);
    }
  });
}
if (legacy.studentPublication) {
  legacy.studentPublication.forEach((pub) => {
    const collegeId = getCollegeIdByKey(pub.collegeKey);
    if (pub.studentOrg) {
      pub.studentOrg.forEach((org) => {
        if (collegeId) org.collegeId = collegeId;
        if (
          !main.studentOrganizations.some(
            (mso) => mso.id === org.id && mso.collegeId === collegeId
          )
        ) {
          main.studentOrganizations.push(org);
        }
      });
    }
    if (pub.accomplishments) {
      pub.accomplishments.forEach((acc) => {
        if (collegeId) acc.collegeId = collegeId;
        if (
          !main.studentAccomplishments.some(
            (msa) => msa.id === acc.id && msa.collegeId === collegeId
          )
        ) {
          main.studentAccomplishments.push(acc);
        }
      });
    }
  });
}

// 4. Alumni & Testimonials
if (legacy.alumni) {
  legacy.alumni.forEach((al) => {
    const collegeId = getCollegeIdByKey(al.collegeKey);
    if (al.tracer) {
      al.tracer.forEach((tr) => {
        if (collegeId) tr.collegeId = collegeId;
        if (
          !main.alumni.some(
            (ma) => ma.id === tr.id && ma.collegeId === collegeId
          )
        ) {
          main.alumni.push(tr);
        }
      });
    }
    if (al.testimonials) {
      al.testimonials.forEach((ts) => {
        if (collegeId) ts.collegeId = collegeId;
        if (
          !main.alumniTestimonials.some(
            (mt) => mt.id === ts.id && mt.collegeId === collegeId
          )
        ) {
          main.alumniTestimonials.push(ts);
        }
      });
    }
  });
}

fs.writeFileSync(mainPath, JSON.stringify(main, null, 2), 'utf-8');
console.log('Migration complete!');
